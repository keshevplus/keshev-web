require('dotenv').config();
const { Pool } = require('pg');
const { neon } = require('@neondatabase/serverless');

// Test local PostgreSQL connection
async function testLocalConnection() {
  console.log('Testing connection to local PostgreSQL database...');
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

  try {
    const result = await pool.query('SELECT NOW() as now');
    console.log('✅ Local PostgreSQL connection successful!');
    console.log(`Current time from database: ${result.rows[0].now}`);
    
    // Get table info
    const tables = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('\nTables in local database:');
    tables.rows.forEach(row => console.log(`- ${row.table_name}`));
  } catch (error) {
    console.error('❌ Local PostgreSQL connection failed:', error.message);
  } finally {
    await pool.end();
  }
}

// Test Neon connection
async function testNeonConnection() {
  console.log('\nTesting connection to Neon serverless database...');
  
  if (!process.env.NEON_DATABASE_URL) {
    console.error('❌ NEON_DATABASE_URL not found in environment variables');
    return;
  }
  
  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    const result = await sql`SELECT NOW() as now`;
    console.log('✅ Neon connection successful!');
    console.log(`Current time from database: ${result[0].now}`);
    
    // Get table info
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\nTables in Neon database:');
    tables.forEach(row => console.log(`- ${row.table_name}`));
  } catch (error) {
    console.error('❌ Neon connection failed:', error.message);
  }
}

// Run both tests
async function runTests() {
  try {
    await testLocalConnection();
    await testNeonConnection();
  } catch (error) {
    console.error('Error during tests:', error);
  }
}

runTests();
