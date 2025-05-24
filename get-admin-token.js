/**
 * Get Admin Token - Manual Guide
 * 
 * This script provides instructions for manually getting an admin token
 * for testing the leads API.
 */

import { config } from 'dotenv';
config();

function getAdminToken() {
  const devAdminEmail = process.env.VITE_DEV_ADMIN_EMAIL;
  
  console.log('\n=== KESHEV+ ADMIN TOKEN GUIDE ===');
  
  if (devAdminEmail) {
    console.log('\nDevelopment Admin Email detected:', devAdminEmail);
    console.log('\nTo get an admin token:');
  } else {
    console.log('\nNo VITE_DEV_ADMIN_EMAIL found in .env files.');
    console.log('You can add this to your .env.local file for easier login during development.');
    console.log('\nTo get an admin token with regular login:');
  }
  
  console.log('\n1. Make sure your development server is running:');
  console.log('   pnpm run dev');
  
  console.log('\n2. Open your browser and navigate to:');
  console.log('   http://localhost:5173/admin/login');
  
  if (devAdminEmail) {
    console.log('\n3. Login using:');
    console.log(`   Email: ${devAdminEmail}`);
    console.log('   Password: [leave empty]');
  } else {
    console.log('\n3. Login with your admin credentials');
  }
  
  console.log('\n4. After successful login, open browser developer tools:');
  console.log('   - Press F12 or right-click and select Inspect');
  console.log('   - Go to the Application tab');
  console.log('   - In the left sidebar, expand Local Storage and select your site');
  console.log('   - Find the entry named "token" or "authToken"');
  console.log('   - Copy the entire value (it will be a long string)');
  
  console.log('\n5. Create a .env.local file in this directory with:');
  console.log('   TEST_AUTH_TOKEN=your_copied_token_here');
  
  console.log('\n6. Run the API test with:');
  console.log('   node test-leads-api.js');
  
  console.log('\n===============================\n');
}

getAdminToken();
