const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);
    
    console.log('Database schema created successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

initializeDatabase();
