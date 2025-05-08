import { Client } from '@neondatabase/serverless';

// Get database connection string from environment variable
const connectionString = process.env.NEON_DATABASE_URL;

async function saveContactToDatabase(contactData) {
  if (!connectionString) {
    throw new Error('Database connection string not found in environment variables');
  }

  const client = new Client(connectionString);
  
  try {
    await client.connect();
    
    // Insert the contact form data into the leads table
    const query = `
      INSERT INTO leads (name, email, phone, subject, message, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    
    const values = [
      contactData.name,
      contactData.email,
      contactData.phone,
      contactData.subject,
      contactData.message,
      new Date()
    ];
    
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

export default async function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Save contact form data to database
      const result = await saveContactToDatabase(data);
      
      // Return success response
      res.status(200).json({
        message: 'Contact form received and saved to database!',
        id: result.id
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: 'Failed to process contact form' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
