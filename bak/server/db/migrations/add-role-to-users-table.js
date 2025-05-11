// Migration: add-role-to-users-table.js
// Adds 'role' column to users table (default 'user')

const { Pool } = require('pg');
require('dotenv').config({ path: __dirname + '/../../.env' });

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  const client = await pool.connect();
  try {
    // Add the role column if it doesn't exist
    await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user';`);
    // Set role to 'admin' where is_admin is true, else 'user'
    await client.query(`UPDATE users SET role = CASE WHEN is_admin THEN 'admin' ELSE 'user' END;`);
    console.log('Migration complete: role column added and populated.');
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
