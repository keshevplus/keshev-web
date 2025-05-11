const { query } = require('../../config/neon');

async function initSchema() {
  try {
    console.log('Starting database schema initialization...');
    
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Users table created or already exists');
    
    // Create leads table
    await query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        date_received TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'new',
        notes TEXT,
        assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('Leads table created or already exists');
    
    // Create index on commonly searched fields
    await query('CREATE INDEX IF NOT EXISTS idx_leads_date_received ON leads(date_received)');
    await query('CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)');
    await query('CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone)');
    
    console.log('Database schema initialization completed successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
}

module.exports = { initSchema };
