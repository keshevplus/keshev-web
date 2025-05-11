// scripts/seed-fake-users.js
// Usage: pnpm exec node server/scripts/seed-fake-users.js

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const faker = require('faker');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function doubleHashPassword(password) {
  const hash1 = await bcrypt.hash(password, 10);
  const hash2 = await bcrypt.hash(hash1, 10);
  return hash2;
}

// Insert or update admin user
async function upsertAdminUser() {
  const client = await pool.connect();
  try {
    const adminEmail = 'dr@keshevplus.co.il';
    const adminPassword = 'Admin123!';
    const adminUsername = 'Admin';
    const doubleHashed = await doubleHashPassword(adminPassword);
    const createdAt = new Date();

    // Upsert admin user (update if exists, insert if not)
    await client.query(
      `INSERT INTO users (username, password, email, is_admin, role, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO UPDATE SET
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          is_admin = EXCLUDED.is_admin,
          role = EXCLUDED.role,
          created_at = EXCLUDED.created_at`,
      [adminUsername, doubleHashed, adminEmail, true, 'admin', createdAt]
    );
    console.log(`Admin user upserted: ${adminUsername} (${adminEmail}) | password: ${adminPassword}`);
  } finally {
    client.release();
  }
}

async function seedUsers() {
  await upsertAdminUser();
  const client = await pool.connect();
  try {
    for (let i = 0; i < 100; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const passwordPlain = faker.internet.password(12);
      const doubleHashed = await doubleHashPassword(passwordPlain);
      const createdAt = new Date();

      await client.query(
        `INSERT INTO users (username, password, email, is_admin, role, created_at)
          VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          username,
          doubleHashed,
          email,
          false,
          'user',
          createdAt,
        ]
      );
      console.log(`Inserted user ${i + 1}: ${username} (${email}) | password: ${passwordPlain}`);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

seedUsers().catch((err) => {
  console.error('Error seeding users:', err);
  process.exit(1);
});
