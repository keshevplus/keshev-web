require('dotenv').config();
const { checkConnection } = require('../config/neon');
const { initSchema } = require('../db/migrations/init-schema');

async function runMigrations() {
  try {
    console.log('Checking database connection...');
    const connected = await checkConnection();
    
    if (!connected) {
      console.error('Cannot run migrations: Database connection failed');
      process.exit(1);
    }
    
    console.log('Running migrations...');
    await initSchema();
    
    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
