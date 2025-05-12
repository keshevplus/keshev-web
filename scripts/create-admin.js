const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });
const bcrypt = require('bcryptjs');
const { neon } = require('@neondatabase/serverless');

async function createAdminUser() {
  try {
    console.log('Connecting to Neon database...');
    // Use Neon's serverless driver instead of pg Pool
    const sql = neon(process.dotenv.config({ path: __dirname + '/../.env' })
    .DATABASE_URL);
    
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
      INSERT INTO users (username, email, password, is_admin, role, created_at)
      VALUES (${username}, ${email}, ${hashedPassword}, ${is_admin}, ${role}, NOW())
      RETURNING user_id, username, email, is_admin, role
    `;

    console.log('Admin user created successfully');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', insertResult[0].user_id);
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
