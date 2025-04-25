require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Hebrew names for more realistic mock data
const hebrewFirstNames = [
  'אבי', 'יעל', 'משה', 'שרה', 'דוד', 'רחל', 'יוסף', 'חנה', 'יעקב', 'מרים',
  'אריאל', 'תמר', 'נועם', 'מיכל', 'איתן', 'אסתר', 'עומר', 'ליאת', 'אלון', 'שירה',
  'רון', 'נועה', 'גיל', 'אורית', 'אמיר', 'הילה', 'עידו', 'גלית', 'יונתן', 'דנה'
];

const hebrewLastNames = [
  'כהן', 'לוי', 'מזרחי', 'פרץ', 'ביטון', 'אברהם', 'פרידמן', 'שפירא', 'גולדברג', 'רוזנברג',
  'אדלר', 'גרינברג', 'ברקוביץ', 'וייס', 'קליין', 'גרוס', 'שטיין', 'פלדמן', 'הופמן', 'שוורץ',
  'רוזן', 'אלון', 'שלום', 'דהן', 'אוחיון', 'אזולאי', 'גבאי', 'חדד', 'אלבז', 'אמסלם'
];

// Generate a random user
function generateRandomUser(index) {
  const firstName = hebrewFirstNames[Math.floor(Math.random() * hebrewFirstNames.length)];
  const lastName = hebrewLastNames[Math.floor(Math.random() * hebrewLastNames.length)];
  const username = `user${index}`;
  const email = `${username}@example.com`;
  const password = `Password${index}!`; // Simple pattern for test users
  
  return {
    username,
    email,
    password,
    fullName: `${firstName} ${lastName}`,
    role: 'user',
    is_admin: false
  };
}

// Create connection to Neon database
async function connectToNeonDB() {
  try {
    if (!process.env.NEON_DATABASE_URL) {
      console.error('NEON_DATABASE_URL environment variable is not set');
      return null;
    }
    
    const sql = neon(process.env.NEON_DATABASE_URL);
    console.log('Connected to Neon PostgreSQL database');
    return { sql, type: 'neon' };
  } catch (error) {
    console.error('Failed to connect to Neon database:', error.message);
    return null;
  }
}

// Create connection to local PostgreSQL database
async function connectToLocalDB() {
  try {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'keshevplus',
      password: process.env.DB_PASSWORD || '', // Use empty string if not set
      port: 5432,
    });
    
    // Test the connection
    await pool.query('SELECT NOW()');
    console.log('Connected to local PostgreSQL database');
    return { pool, type: 'local' };
  } catch (error) {
    console.error('Failed to connect to local database:', error.message);
    return null;
  }
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
          INSERT INTO users (username, email, password, role, is_admin, full_name) 
          VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.is_admin}, ${user.fullName})
        `;
        console.log(`✅ Created user: ${user.username}`);
      } else {
        console.log(`⚠️ User ${user.username} already exists, skipping`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error.message);
    }
  }
}

// Insert users using local PostgreSQL client
async function insertUsersLocal(pool, users) {
  console.log(`Inserting ${users.length} mock users into local database...`);
  
  for (const user of users) {
    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT COUNT(*) as count FROM users WHERE username = $1 OR email = $2',
        [user.username, user.email]
      );
      
      if (parseInt(existingUser.rows[0].count) === 0) {
        await pool.query(
          'INSERT INTO users (username, email, password, role, is_admin, full_name) VALUES ($1, $2, $3, $4, $5, $6)',
          [user.username, user.email, hashedPassword, user.role, user.is_admin, user.fullName]
        );
        console.log(`✅ Created user: ${user.username}`);
      } else {
        console.log(`⚠️ User ${user.username} already exists, skipping`);
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
    role: user.role,
    is_admin: user.is_admin
  }));
  
  fs.writeFileSync(outputPath, JSON.stringify(safeUsers, null, 2));
  console.log(`✅ Saved mock user data to ${outputPath}`);
}

// Main function
async function createMockUsers() {
  console.log('Starting mock user creation process...');
  
  // Generate 50 random users
  const mockUsers = Array.from({ length: 50 }, (_, i) => generateRandomUser(i + 1));
  
  // Save user data to JSON file for reference
  saveUsersToJson(mockUsers);
  
  // Try to connect to Neon database first
  let db = await connectToNeonDB();
  
  // If Neon connection fails, try local database
  if (!db) {
    console.log('Falling back to local PostgreSQL database...');
    db = await connectToLocalDB();
  }
  
  // If both connections fail, exit
  if (!db) {
    console.error('Failed to connect to any database. Exiting.');
    process.exit(1);
  }
  
  // Insert users based on the connection type
  if (db.type === 'neon') {
    await insertUsersNeon(db.sql, mockUsers);
  } else {
    await insertUsersLocal(db.pool, mockUsers);
    // Close the pool when done
    await db.pool.end();
  }
  
  console.log('Mock user creation process completed!');
}

// Run the script
createMockUsers().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
