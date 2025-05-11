require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function checkDatabaseConnection() {
  console.log('Checking database connection...');
  
  // Try to load environment variables from different locations
  const envFiles = [
    path.join(__dirname, '../.env'),
    path.join(__dirname, '../.env.development.local'),
    path.join(__dirname, '../.env.local'),
    path.join(__dirname, '../../.env'),
    path.join(__dirname, '../../.env.development.local')
  ];
  
  let databaseUrl = process.env.NEON_DATABASE_URL || process.env.KP_POSTGRES_URL;
  
  // If database URL is not in process.env, try to read from env files directly
  if (!databaseUrl) {
    for (const envFile of envFiles) {
      if (fs.existsSync(envFile)) {
        console.log(`Found environment file: ${envFile}`);
        const envContent = fs.readFileSync(envFile, 'utf8');
        
        // Look for NEON_DATABASE_URL or KP_POSTGRES_URL in the file
        const neonMatch = envContent.match(/NEON_DATABASE_URL=["']?([^"'\s]+)["']?/);
        const kpMatch = envContent.match(/KP_POSTGRES_URL=["']?([^"'\s]+)["']?/);
        
        if (neonMatch && neonMatch[1]) {
          databaseUrl = neonMatch[1];
          console.log('Found NEON_DATABASE_URL in environment file');
          break;
        } else if (kpMatch && kpMatch[1]) {
          databaseUrl = kpMatch[1];
          console.log('Found KP_POSTGRES_URL in environment file');
          break;
        }
      }
    }
  }
  
  if (!databaseUrl) {
    console.error('\nERROR: Could not find database URL in any environment file');
    console.log('\nPlease make sure one of these environment variables is set:');
    console.log('- NEON_DATABASE_URL');
    console.log('- KP_POSTGRES_URL');
    
    // Check if we have the Supabase URL in environment variables
    if (process.env.KP_POSTGRES_HOST) {
      console.log('\nFound KP_POSTGRES_HOST in environment variables. Constructing connection URL...');
      
      const host = process.env.KP_POSTGRES_HOST;
      const user = process.env.KP_POSTGRES_USER || 'postgres';
      const password = process.env.KP_POSTGRES_PASSWORD;
      const database = process.env.KP_POSTGRES_DATABASE || 'postgres';
      
      if (host && password) {
        databaseUrl = `postgres://${user}:${password}@${host}:5432/${database}?sslmode=require`;
        console.log('Successfully constructed database URL from environment variables');
      }
    }
    
    if (!databaseUrl) {
      console.log('\nPlease check your environment configuration and try again.');
      return;
    }
  }
  
  try {
    console.log('\nAttempting to connect to database...');
    const sql = neon(databaseUrl);
    
    // Test the connection by running a simple query
    const result = await sql`SELECT NOW() as current_time`;
    console.log(`\n✅ Successfully connected to database!`);
    console.log(`Current database time: ${result[0].current_time}`);
    
    // Check if users table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      ) as exists
    `;
    
    if (tableCheck[0].exists) {
      console.log('\n✅ Users table exists');
      
      // Get the column names from the users table
      const columnsQuery = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      `;
      
      console.log('\nUsers table schema:');
      columnsQuery.forEach(col => {
        console.log(`- ${col.column_name} (${col.data_type})`);
      });
      
      // Get user count
      const usersCount = await sql`SELECT COUNT(*) as count FROM users`;
      console.log(`\nTotal users in database: ${usersCount[0].count}`);
      
      // Create a temporary file with the working database URL
      const tempFile = path.join(__dirname, 'database-connection.js');
      fs.writeFileSync(tempFile, `
// This is a temporary file with the working database connection
// Do not commit this file to git

module.exports = {
  databaseUrl: "${databaseUrl}"
};
      `);
      
      console.log(`\nCreated temporary connection file at: ${tempFile}`);
      console.log('You can use this in your scripts to connect to the database:');
      console.log('\nconst { databaseUrl } = require(\'./scripts/database-connection.js\');');
      console.log('const { neon } = require(\'@neondatabase/serverless\');');
      console.log('const sql = neon(databaseUrl);');
    } else {
      console.log('\n⚠️ Users table does not exist');
    }
  } catch (error) {
    console.error('\nERROR: Failed to connect to database');
    console.error(error.message);
    console.log('\nPlease check your database URL and try again.');
  }
}

checkDatabaseConnection().catch(err => console.error('Unhandled error:', err));
