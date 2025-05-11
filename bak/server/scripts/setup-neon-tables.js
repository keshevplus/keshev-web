require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function setupNeonTables() {
  console.log('Setting up tables in Neon PostgreSQL database...');
  
  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Check if leads table exists
    console.log('Checking if leads table exists...');
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'leads'
      ) as exists
    `;
    
    if (tableCheck[0].exists) {
      console.log('✅ Leads table already exists');
    } else {
      console.log('Creating leads table...');
      await sql`
        CREATE TABLE leads (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT NOT NULL,
          subject TEXT,
          message TEXT NOT NULL,
          date_received TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('✅ Leads table created successfully');
    }
    
    // Check if we have the pgcrypto extension
    const extensionCheck = await sql`
      SELECT EXISTS (
        SELECT FROM pg_extension WHERE extname = 'pgcrypto'
      ) as exists
    `;
    
    if (!extensionCheck[0].exists) {
      console.log('Creating pgcrypto extension...');
      await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
      console.log('✅ pgcrypto extension created');
    } else {
      console.log('✅ pgcrypto extension already exists');
    }
    
    console.log('\nDatabase setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupNeonTables().catch(err => console.error('Unhandled error:', err));
