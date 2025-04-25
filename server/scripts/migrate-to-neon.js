require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

// Configure local PostgreSQL connection
const localPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'keshev-web',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Create Neon SQL executor
const sql = neon(process.env.NEON_DATABASE_URL);

// Tables to migrate
const TABLES = [
  'hero_content',
  'leads',
  'services',
  'team_members',
  'testimonials',
  'users'
];

async function createTable(tableName, localClient) {
  console.log(`Creating table ${tableName} in Neon...`);
  
  // Get column definitions from local DB
  const columnsQuery = `
    SELECT 
      column_name, 
      data_type, 
      character_maximum_length, 
      is_nullable, 
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `;
  
  const columnsResult = await localClient.query(columnsQuery, [tableName]);
  const columns = columnsResult.rows;
  
  // Generate CREATE TABLE statement
  let createStmt = `CREATE TABLE IF NOT EXISTS "${tableName}" (`;
  const columnDefs = [];
  
  for (const col of columns) {
    let colDef = `"${col.column_name}" ${col.data_type}`;
    
    // Add length for character types
    if (col.character_maximum_length && col.data_type.includes('char')) {
      colDef += `(${col.character_maximum_length})`;
    }
    
    // Add NULL constraint
    colDef += col.is_nullable === 'NO' ? ' NOT NULL' : '';
    
    // Add default value if present
    if (col.column_default) {
      colDef += ` DEFAULT ${col.column_default}`;
    }
    
    columnDefs.push(colDef);
  }
  
  createStmt += columnDefs.join(', ');
  createStmt += ')';
  
  // Execute CREATE TABLE
  try {
    await sql.query(createStmt);
    console.log(`Table ${tableName} created successfully`);
    
    // Get primary key if any
    const pkQuery = `
      SELECT 
        tc.constraint_name,
        kcu.column_name
      FROM 
        information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
      WHERE 
        tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = $1
    `;
    
    const pkResult = await localClient.query(pkQuery, [tableName]);
    
    if (pkResult.rows.length > 0) {
      const pkColumns = pkResult.rows.map(row => `"${row.column_name}"`).join(', ');
      const pkName = `pk_${tableName}`;
      const alterStmt = `ALTER TABLE "${tableName}" ADD CONSTRAINT ${pkName} PRIMARY KEY (${pkColumns})`;
      
      try {
        await sql.query(alterStmt);
        console.log(`Added primary key to ${tableName}`);
      } catch (e) {
        console.error(`Error adding primary key to ${tableName}:`, e.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error.message);
    return false;
  }
}

async function migrateTableData(tableName, localClient) {
  console.log(`Migrating data for table ${tableName}...`);
  
  // Get data from local DB
  const dataQuery = `SELECT * FROM "${tableName}"`;
  const dataResult = await localClient.query(dataQuery);
  const rows = dataResult.rows;
  
  console.log(`Found ${rows.length} rows to migrate`);
  
  if (rows.length === 0) {
    console.log('No data to migrate');
    return true;
  }
  
  // Clear existing data in Neon table
  try {
    await sql.query(`DELETE FROM "${tableName}"`);
    console.log(`Cleared existing data from ${tableName}`);
  } catch (error) {
    console.error(`Error clearing data from ${tableName}:`, error.message);
    // Continue anyway
  }
  
  // Insert data in batches
  const batchSize = 50;
  let successCount = 0;
  
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, Math.min(i + batchSize, rows.length));
    
    for (const row of batch) {
      const columns = Object.keys(row).filter(col => row[col] !== null);
      const values = columns.map(col => row[col]);
      
      const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');
      const insertStmt = `INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${placeholders})`;
      
      try {
        await sql.query(insertStmt, values);
        successCount++;
      } catch (error) {
        console.error(`Error inserting row into ${tableName}:`, error.message);
        console.error('Problematic row:', row);
      }
    }
    
    console.log(`Migrated ${Math.min((i + batchSize), rows.length)}/${rows.length} rows`);
  }
  
  console.log(`Successfully migrated ${successCount}/${rows.length} rows to ${tableName}`);
  return true;
}

async function migrateAllTables() {
  console.log('Starting migration to Neon database...');
  const client = await localPool.connect();
  
  try {
    for (const tableName of TABLES) {
      console.log(`\nProcessing table: ${tableName}`);
      
      try {
        // Check if table exists in Neon
        const tableCheckQuery = `
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
          ) as exists
        `;
        
        const result = await sql.query(tableCheckQuery, [tableName]);
        const tableExists = result.rows[0].exists;
        
        if (!tableExists) {
          // Create table structure
          await createTable(tableName, client);
        } else {
          console.log(`Table ${tableName} already exists in Neon`);
        }
        
        // Migrate data
        await migrateTableData(tableName, client);
        
        console.log(`Completed migration for ${tableName}`);
      } catch (error) {
        console.error(`Error processing table ${tableName}:`, error.message);
      }
    }
    
    console.log('\nMigration to Neon completed!');
  } catch (error) {
    console.error('Migration error:', error.message);
  } finally {
    client.release();
    await localPool.end();
  }
}

// Run the migration
migrateAllTables().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
