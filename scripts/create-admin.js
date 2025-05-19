import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '/../.env') });

// Debug: Check if DATABASE_URL is loaded
console.log('DATABASE_URL from .env:', process.env.DATABASE_URL);

async function createAdminUser() {
  try {
    console.log('Connecting to Neon database...');
    // Use Neon's serverless driver instead of pg Pool
    const sql = neon(process.env.DATABASE_URL);
    
    // Create admin user with default credentials
    const username = 'admin';
    const email = 'dr@keshevplus.co.il';
    const password = 'changeme123'; // Prompt user to change after first login
    const is_admin = true;
    const role = 'db_owner';
    
    console.log('Checking if user already exists...');
    // Check if user exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (existingUser && existingUser.length > 0) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    console.log('Hashing password...');
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Creating admin user...');
    // Insert admin user
    const insertResult = await sql`
      INSERT INTO users (name, email, password_hash, role, status, created_at)
      VALUES (${username}, ${email}, ${hashedPassword}, ${role}, 'active', NOW())
      RETURNING id, name, email, role, status
    `;

    console.log('Admin user created successfully');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', insertResult[0].id);
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
