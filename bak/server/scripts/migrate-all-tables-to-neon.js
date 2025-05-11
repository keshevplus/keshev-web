require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

// Configure the PostgreSQL connection
const localPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'keshev-web',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Configure the Neon connection
const sql = neon(process.env.NEON_DATABASE_URL);

async function migrateAllTables() {
  console.log('Starting migration of all tables from local PostgreSQL to Neon...');
  const localClient = await localPool.connect();
  
  try {
    // Get all tables from local database
    const tablesResult = await localClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables to migrate: ${tables.join(', ')}`);
    
    // Process each table
    for (const tableName of tables) {
      try {
        console.log(`\nProcessing table: ${tableName}`);
        
        // Step 1: Get table structure from local database
        const structureResult = await localClient.query(`
          SELECT 
            column_name, 
            data_type, 
            character_maximum_length, 
            is_nullable, 
            column_default
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [tableName]);
        
        const columns = structureResult.rows;
        console.log(`Table ${tableName} has ${columns.length} columns`);
        
        // Step 2: Check if table exists in Neon
        const tableExistsResult = await sql`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = ${tableName}
          ) as exists
        `;
        
        const tableExists = tableExistsResult[0].exists;
        
        // Step 3: Create table in Neon if it doesn't exist
        if (!tableExists) {
          console.log(`Creating table ${tableName} in Neon...`);
          
          // Get the CREATE TABLE statement from pg_dump
          const createTableResult = await localClient.query(`
            SELECT 
              'CREATE TABLE ' || 
              quote_ident(relname) || ' (' ||
              array_to_string(
                array_agg(
                  quote_ident(attname) || ' ' ||
                  pg_catalog.format_type(atttypid, atttypmod) ||
                  CASE WHEN attnotnull THEN ' NOT NULL' ELSE '' END ||
                  CASE WHEN atthasdef 
                       THEN ' DEFAULT ' || pg_get_expr(adbin, adrelid) 
                       ELSE '' 
                  END
                ), ', '
              ) || ')' as create_statement
            FROM pg_attribute
            JOIN pg_class ON pg_class.oid = attrelid
            JOIN pg_namespace ON pg_namespace.oid = relnamespace
            LEFT JOIN pg_attrdef ON adrelid = attrelid AND adnum = attnum
            WHERE attnum > 0
            AND attisdropped = false
            AND relkind = 'r'
            AND nspname = 'public'
            AND relname = $1
            GROUP BY relname
          `, [tableName]);
          
          if (createTableResult.rows.length > 0) {
            const createTableStatement = createTableResult.rows[0].create_statement;
            
            // Execute CREATE TABLE statement with Neon
            await sql`${createTableStatement}`;
            console.log(`Table ${tableName} created in Neon`);
          } else {
            console.error(`Could not generate CREATE TABLE statement for ${tableName}`);
            continue;
          }
        } else {
          console.log(`Table ${tableName} already exists in Neon`);
        }
        
        // Step 4: Get data from local table
        const dataResult = await localClient.query(`SELECT * FROM "${tableName}"`);
        const rows = dataResult.rows;
        console.log(`Found ${rows.length} rows in ${tableName}`);
        
        // Skip data migration if no rows
        if (rows.length === 0) {
          console.log(`No data to migrate for table ${tableName}`);
          continue;
        }
        
        // Step 5: Clear existing data from Neon table
        await sql`DELETE FROM ${sql(tableName)}`;
        console.log(`Cleared existing data from ${tableName} in Neon`);
        
        // Step 6: Insert data in batches
        const batchSize = 50;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          console.log(`Migrating batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(rows.length/batchSize)} for ${tableName}`);
          
          for (const row of batch) {
            const columnNames = Object.keys(row);
            const placeholders = columnNames.map((_, index) => `$${index + 1}`).join(', ');
            const values = Object.values(row);
            
            // Build a dynamic query
            const query = `INSERT INTO "${tableName}" ("${columnNames.join('", "')}") VALUES (${placeholders})`;
            
            try {
              // For Neon, we need to use template literals
              await sql`
                INSERT INTO ${sql(tableName)} ${sql(columnNames.map(c => `"${c}"`))}
                VALUES ${sql(values)}
              `;
            } catch (error) {
              console.error(`Error inserting row in ${tableName}:`, error.message || error);
              // Continue with other rows
            }
          }
        }
        
        console.log(`Migration completed for table ${tableName}`);
      } catch (error) {
        console.error(`Error processing table ${tableName}:`, error.message || error);
      }
    }
    
    console.log('\nMigration of all tables completed!');
  } catch (error) {
    console.error('Migration error:', error.message || error);
  } finally {
    localClient.release();
    await localPool.end();
  }
}

migrateAllTables().catch(err => console.error('Unhandled error:', err));
