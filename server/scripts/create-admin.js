require('dotenv').config({ path: '../.env' });

const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

async function createAdminUser() {
  try {
    console.log('Connecting to Neon database...');
    // Use Neon's serverless driver instead of pg Pool
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Create admin user with default credentials
    const email = 'dr@keshevplus.co.il'; 
    const password = 'Admin123!';
    const username = 'admin';
    const role = 'admin';

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
    // Insert user
    const result = await sql`
      INSERT INTO users (username, email, password, role, created_at, updated_at) 
      VALUES (${username}, ${email}, ${hashedPassword}, ${role}, NOW(), NOW()) 
      RETURNING id, username, email, role, created_at, updated_at
    `;

    console.log('Admin user created successfully');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', result[0].id);
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
