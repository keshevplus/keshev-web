const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

// Check for required environment variables
const requiredEnvVars = ['NEON_DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Create SQL query function using neon
const sql = neon(process.env.NEON_DATABASE_URL);

// Wrapper function to execute queries with error handling
async function query(text, params = []) {
  try {
    console.log('Executing query:', {
      query: text.replace(/\s+/g, ' ').trim(),
      params: params.map(p => typeof p === 'string' && p.length > 20 ? p.substring(0, 20) + '...' : p)
    });
    
    const result = await sql(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', {
      error: error.message,
      query: text.replace(/\s+/g, ' ').trim(),
      params: params.map(p => typeof p === 'string' && p.length > 20 ? p.substring(0, 20) + '...' : p)
    });
    throw error;
  }
}

// Connection check function
async function checkConnection() {
  try {
    const result = await query('SELECT NOW() as now');
    console.log('Database connected successfully:', result[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

module.exports = {
  query,
  checkConnection
};
