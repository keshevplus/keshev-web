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

async function migrateTable(tableName) {
  console.log(`\nStarting migration for table: ${tableName}`);
  const localClient = await localPool.connect();
  
  try {
    // Step 1: Get CREATE TABLE statement
    console.log(`Getting CREATE TABLE statement for ${tableName}...`);
    
    // Check if table exists in Neon
    const checkTableResult = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = ${tableName}
      ) as exists
    `;
    
    const tableExists = checkTableResult[0].exists;
    
    // Create table if it doesn't exist
    if (!tableExists) {
      // Get structure details from local DB
      const structureQuery = `
        SELECT column_name, data_type, 
          CASE 
            WHEN data_type = 'character varying' THEN '(' || character_maximum_length || ')'
            WHEN data_type = 'numeric' THEN '(' || numeric_precision || ',' || numeric_scale || ')'
            ELSE ''
          END as type_modifier,
          is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position
      `;
      
      const structureResult = await localClient.query(structureQuery, [tableName]);
      const columns = structureResult.rows;
      
      // Create table manually with proper syntax for each column
      let createTableStr = `CREATE TABLE ${tableName} (`;
      
      const columnDefinitions = columns.map(col => {
        let def = `"${col.column_name}" ${col.data_type}${col.type_modifier}`;
        if (col.is_nullable === 'NO') def += ' NOT NULL';
        if (col.column_default) def += ` DEFAULT ${col.column_default}`;
        return def;
      }).join(', ');
      
      createTableStr += columnDefinitions + ')';
      
      // Execute CREATE TABLE in Neon
      await sql`${createTableStr}`;
      console.log(`Created table ${tableName} in Neon`);
    } else {
      console.log(`Table ${tableName} already exists in Neon`);
    }
    
    // Step 2: Get data from local DB
    const dataResult = await localClient.query(`SELECT * FROM "${tableName}"`); 
    const rows = dataResult.rows;
    console.log(`Found ${rows.length} rows to migrate`);
    
    if (rows.length === 0) {
      console.log('No data to migrate, skipping...');
      return;
    }
    
    // Step 3: Clear existing data if any
    const clearQuery = `DELETE FROM ${tableName}`;
    await sql`${clearQuery}`;
    
    // Step 4: Insert data row by row (safer approach)
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const columnNames = Object.keys(row);
      const values = Object.values(row);
      
      // For logging/debugging only show progress every 10 rows
      if (i % 10 === 0 || i === rows.length - 1) {
        console.log(`Inserting row ${i+1}/${rows.length}`);
      }
      
      // Construct INSERT statement dynamically
      let insertQuery = `INSERT INTO ${tableName} (`;
      
      // Add column names
      insertQuery += columnNames.map(name => `"${name}"`).join(', ');
      insertQuery += ') VALUES (';
      
      // Add placeholders for values
      insertQuery += columnNames.map(() => '?').join(', ');
      insertQuery += ')';
      
      try {
        // For Neon tagged templates, we need to split this
        // Use a custom function to build the query properly
        await insertRow(tableName, columnNames, values);
      } catch (err) {
        console.error(`Error inserting row ${i+1}:`, err.message || err);
        console.error('Continuing with next row...');
      }
    }
    
    console.log(`Migration completed for table: ${tableName}`);
  } catch (error) {
    console.error(`Error migrating table ${tableName}:`, error.message || error);
  } finally {
    localClient.release();
  }
}

// Helper function to insert a row using Neon's tagged template
async function insertRow(tableName, columnNames, values) {
  // This approach builds a dynamic query safer for Neon
  const columnStr = columnNames.map(name => `"${name}"`).join(', ');
  
  // For simplicity, use a raw string approach
  const valuesClause = values.map((_, i) => `$${i+1}`).join(', ');
  const queryText = `INSERT INTO "${tableName}" (${columnStr}) VALUES (${valuesClause})`;
  
  // Execute the query through the raw interface
  return await sql.query(queryText, values);
}

async function migrateAllTables() {
  try {
    console.log('Starting migration from local PostgreSQL to Neon...');
    const localClient = await localPool.connect();
    
    // Get all tables
    const tablesResult = await localClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    
    localClient.release();
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables: ${tables.join(', ')}`);
    
    // Migrate each table one by one
    for (const tableName of tables) {
      await migrateTable(tableName);
    }
    
    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error.message || error);
  } finally {
    await localPool.end();
  }
}

migrateAllTables().catch(err => console.error('Unhandled error:', err));
