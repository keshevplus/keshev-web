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

async function seedUsers() {
  const client = await pool.connect();
  try {
    for (let i = 0; i < 100; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const passwordPlain = faker.internet.password(12);
      const doubleHashed = await doubleHashPassword(passwordPlain);
      const createdAt = new Date();

      await client.query(
        `INSERT INTO users (username, password, email, is_admin, created_at)
          VALUES ($1, $2, $3, $4, $5)`,
        [
          username,
          doubleHashed,
          email,
          false,
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
