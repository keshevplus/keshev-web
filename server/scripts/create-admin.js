require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createAdminUser() {
  try {
    // Create admin user with default credentials
    const email = 'dr@keshevplus.co.il'; 
    const password = 'Admin123!';
    const username = 'admin';

    // Create admin user using the User model
    const user = await User.createAdmin({ username, email, password });

    console.log('Admin user created successfully');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', user.id);
    
    process.exit(0);
  } catch (err) {
    if (err.message === 'User already exists') {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
