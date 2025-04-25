require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// Directory to store backups
const BACKUP_DIR = path.join(__dirname, '../backups');

// Parse database connection string
function parseConnectionString(connectionString) {
  // Expected format: postgresql://username:password@hostname/database?sslmode=require
  const regex = /postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)(\?.*)?/;
  const match = connectionString.match(regex);
  
  if (!match) {
    throw new Error('Invalid connection string format');
  }
  
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    database: match[4],
    ssl: true
  };
}

// Function to create a SQL backup using pg_dump
async function createBackupWithPgDump() {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL environment variable is not set');
  }
  
  // Make sure backup directory exists
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-');
  const backupFileName = `neon-backup-${timestamp}.sql`;
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);
  
  // Parse connection details
  const connDetails = parseConnectionString(process.env.NEON_DATABASE_URL);
  
  // Create pg_dump command with environment variables
  const pgDumpCommand = `set PGPASSWORD=${connDetails.password} && pg_dump -h ${connDetails.host} -U ${connDetails.user} -d ${connDetails.database} -f "${backupFilePath}" --no-owner --no-acl`;
  
  console.log(`Starting Neon database backup to ${backupFilePath}...`);
  
  return new Promise((resolve, reject) => {
    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing pg_dump:', error);
        // If pg_dump fails, try the fallback method
        console.log('Falling back to Node.js backup method...');
        createBackupWithNode(backupFilePath).then(resolve).catch(reject);
        return;
      }
      
      console.log(`Backup completed successfully at ${backupFilePath}`);
      resolve(backupFilePath);
    });
  });
}

// Fallback function to create a SQL backup using Node.js
async function createBackupWithNode(backupFilePath) {
  const sql = neon(process.env.NEON_DATABASE_URL);
  
  try {
    // 1. Get list of all tables
    const tablesResult = await sql.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables to backup: ${tables.join(', ')}`);
    
    let backupContent = `-- Neon database backup created on ${new Date().toISOString()}\n`;
    backupContent += `-- Tables: ${tables.join(', ')}\n\n`;
    
    // 2. For each table, get structure and data
    for (const tableName of tables) {
      console.log(`Processing table: ${tableName}`);
      
      // Get table schema
      const schemaResult = await sql.query(`
        SELECT 
          column_name, 
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM 
          information_schema.columns
        WHERE 
          table_schema = 'public' AND table_name = $1
        ORDER BY 
          ordinal_position
      `, [tableName]);
      
      // Create table
      backupContent += `\n-- Table: ${tableName}\n`;
      backupContent += `DROP TABLE IF EXISTS "${tableName}" CASCADE;\n`;
      backupContent += `CREATE TABLE "${tableName}" (\n`;
      
      const columnDefs = schemaResult.rows.map(col => {
        let def = `  "${col.column_name}" ${col.data_type}`;
        
        // Add length for character types
        if (col.character_maximum_length && col.data_type.includes('char')) {
          def += `(${col.character_maximum_length})`;
        }
        
        // Add NULL constraint
        def += col.is_nullable === 'NO' ? ' NOT NULL' : '';
        
        // Add default value if present
        if (col.column_default) {
          def += ` DEFAULT ${col.column_default}`;
        }
        
        return def;
      });
      
      backupContent += columnDefs.join(',\n');
      backupContent += `\n);\n\n`;
      
      // Get data
      const dataResult = await sql.query(`SELECT * FROM "${tableName}"`); 
      const rows = dataResult.rows;
      
      if (rows.length > 0) {
        backupContent += `-- Data for table: ${tableName}\n`;
        
        for (const row of rows) {
          const columns = Object.keys(row).filter(col => row[col] !== null);
          const values = columns.map(col => {
            const val = row[col];
            if (val === null) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            if (typeof val === 'object' && val instanceof Date) return `'${val.toISOString()}'`;
            return val;
          });
          
          backupContent += `INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${values.join(', ')});\n`;
        }
        
        backupContent += `\n`;
      }
    }
    
    // 3. Write the backup file
    fs.writeFileSync(backupFilePath, backupContent);
    console.log(`Node.js backup completed successfully at ${backupFilePath}`);
    return backupFilePath;
  } catch (error) {
    console.error('Error creating backup with Node.js:', error);
    throw error;
  }
}

// Run the backup
async function runBackup() {
  try {
    // Try pg_dump first, fall back to Node method if needed
    const backupPath = await createBackupWithPgDump();
    
    // Keep only the last 7 backups (1 week worth of daily backups)
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('neon-backup-'))
      .map(file => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);
    
    // Delete older backups, keeping the 7 newest ones
    if (files.length > 7) {
      files.slice(7).forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`Deleted old backup: ${file.name}`);
      });
    }
    
    console.log('Backup process completed successfully.');
  } catch (error) {
    console.error('Backup process failed:', error);
  }
}

// Execute backup if this script is run directly
if (require.main === module) {
  runBackup();
}

module.exports = {
  runBackup
};
