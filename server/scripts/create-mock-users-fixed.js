const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Import the working database connection
const { databaseUrl } = require('./database-connection.js');

// Hebrew names for more realistic mock data
const hebrewFirstNames = [
  'u05d0u05d1u05d9', 'u05d9u05e2u05dc', 'u05deu05e9u05d4', 'u05e9u05e8u05d4', 'u05d3u05d5u05d3', 'u05e8u05d7u05dc', 'u05d9u05d5u05e1u05e3', 'u05d7u05e0u05d4', 'u05d9u05e2u05e7u05d1', 'u05deu05e8u05d9u05dd',
  'u05d0u05e8u05d9u05d0u05dc', 'u05eau05deu05e8', 'u05e0u05d5u05e2u05dd', 'u05deu05d9u05dbu05dc', 'u05d0u05d9u05eau05df', 'u05d0u05e1u05eau05e8', 'u05e2u05d5u05deu05e8', 'u05dcu05d9u05d0u05ea', 'u05d0u05dcu05d5u05df', 'u05e9u05d9u05e8u05d4',
  'u05e8u05d5u05df', 'u05e0u05d5u05e2u05d4', 'u05d2u05d9u05dc', 'u05d0u05d5u05e8u05d9u05ea', 'u05d0u05deu05d9u05e8', 'u05d4u05d9u05dcu05d4', 'u05e2u05d9u05d3u05d5', 'u05d2u05dcu05d9u05ea', 'u05d9u05d5u05e0u05eau05df', 'u05d3u05e0u05d4'
];

const hebrewLastNames = [
  'u05dbu05d4u05df', 'u05dcu05d5u05d9', 'u05deu05d6u05e8u05d7u05d9', 'u05e4u05e8u05e5', 'u05d1u05d9u05d8u05d5u05df', 'u05d0u05d1u05e8u05d4u05dd', 'u05e4u05e8u05d9u05d3u05deu05df', 'u05e9u05e4u05d9u05e8u05d0', 'u05d2u05d5u05dcu05d3u05d1u05e8u05d2', 'u05e8u05d5u05d6u05e0u05d1u05e8u05d2',
  'u05d0u05d3u05dcu05e8', 'u05d2u05e8u05d9u05e0u05d1u05e8u05d2', 'u05d1u05e8u05e7u05d5u05d1u05d9u05e5', 'u05d5u05d9u05d9u05e1', 'u05e7u05dcu05d9u05d9u05df', 'u05d2u05e8u05d5u05e1', 'u05e9u05d8u05d9u05d9u05df', 'u05e4u05dcu05d3u05deu05df', 'u05d4u05d5u05e4u05deu05df', 'u05e9u05d5u05d5u05e8u05e5',
  'u05e8u05d5u05d6u05df', 'u05d0u05dcu05d5u05df', 'u05e9u05dcu05d5u05dd', 'u05d3u05d4u05df', 'u05d0u05d5u05d7u05d9u05d5u05df', 'u05d0u05d6u05d5u05dcu05d0u05d9', 'u05d2u05d1u05d0u05d9', 'u05d7u05d3u05d3', 'u05d0u05dcu05d1u05d6', 'u05d0u05deu05e1u05dcu05dd'
];

// Generate a random user
function generateRandomUser(index) {
  const firstName = hebrewFirstNames[Math.floor(Math.random() * hebrewFirstNames.length)];
  const lastName = hebrewLastNames[Math.floor(Math.random() * hebrewLastNames.length)];
  const username = `user${index}`;
  const email = `user${index}@example.com`;
  const password = `Password${index}!`; // Simple pattern for test users
  
  return {
    username,
    email,
    password,
    fullName: `${firstName} ${lastName}`,
    is_admin: false
  };
}

// Insert users using Neon client
async function insertUsersNeon(sql, users) {
  console.log(`Inserting ${users.length} mock users into Neon database...`);
  
  for (const user of users) {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      // Check if user already exists
      const existingUser = await sql`
        SELECT COUNT(*) as count FROM users WHERE username = ${user.username} OR email = ${user.email}
      `;
      
      if (existingUser[0].count === '0') {
        await sql`
          INSERT INTO users (username, email, password, is_admin) 
          VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.is_admin})
        `;
        console.log(`u2705 Created user: ${user.username}`);
      } else {
        console.log(`u26a0ufe0f User ${user.username} already exists, skipping`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error.message);
    }
  }
}

// Save user data to JSON file for reference
function saveUsersToJson(users) {
  const outputPath = path.join(__dirname, '../../client/qa/mock-data/mock-users.json');
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Save users data (without hashed passwords for security)
  const safeUsers = users.map(user => ({
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    password: user.password, // Including plain password in test data for QA purposes
    is_admin: user.is_admin
  }));
  
  fs.writeFileSync(outputPath, JSON.stringify(safeUsers, null, 2));
  console.log(`u2705 Saved mock user data to ${outputPath}`);
}

// Main function
async function createMockUsers() {
  console.log('Starting mock user creation process...');
  
  // Generate 50 random users
  const mockUsers = Array.from({ length: 50 }, (_, i) => generateRandomUser(i + 1));
  
  // Save user data to JSON file for reference
  saveUsersToJson(mockUsers);
  
  try {
    console.log('Connecting to Neon database...');
    const sql = neon(databaseUrl);
    
    // Insert users
    await insertUsersNeon(sql, mockUsers);
    
    console.log('Mock user creation process completed!');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
}

// Run the script
createMockUsers().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
