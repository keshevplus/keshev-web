require('dotenv').config({ path: '../.env.development.local' });
const fs = require('fs');
const path = require('path');

// This script creates a temporary .env file with the correct variable names
// for accessing the Neon database

function setupNeonEnv() {
  console.log('Setting up Neon database environment variables...');
  
  // Get the KP_POSTGRES_URL from the .env.development.local file
  const neonUrl = process.env.KP_POSTGRES_URL;
  
  if (!neonUrl) {
    console.error('Error: KP_POSTGRES_URL not found in .env.development.local');
    console.log('Make sure you have the correct environment variables set.');
    process.exit(1);
  }
  
  console.log('Found database URL in environment variables');
  
  // Create the content for the .env file
  const envContent = `NEON_DATABASE_URL="${neonUrl}"
`;
  
  // Write to a temporary file that won't be committed to git
  const tempEnvPath = path.join(__dirname, 'temp-neon-env.js');
  
  fs.writeFileSync(tempEnvPath, `
// This is a temporary file to help access the Neon database
// It should not be committed to git

module.exports = {
  NEON_DATABASE_URL: "${neonUrl}"
};
`);
  
  console.log(`\nCreated temporary environment file at: ${tempEnvPath}`);
  console.log('\nTo access your Neon database, use this code:');
  console.log('\nconst neonEnv = require(\'./scripts/temp-neon-env.js\');');
  console.log('const { neon } = require(\'@neondatabase/serverless\');');
  console.log('const sql = neon(neonEnv.NEON_DATABASE_URL);');
  console.log('\nYou can now use the sql variable to query your Neon database.');
}

setupNeonEnv();
