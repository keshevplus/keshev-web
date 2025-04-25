/**
 * Script to import client-side data from TypeScript files to PostgreSQL database
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const esbuild = require('esbuild');

// Configure the database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'keshev-web',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Path to client data files
const DATA_DIR = path.join(__dirname, '../../client/src/data');

// Function to build TypeScript files to JS
async function buildTsFile(filePath) {
  const result = await esbuild.build({
    entryPoints: [filePath],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    target: 'node14',
  });

  if (result.errors.length > 0) {
    throw new Error(`Failed to build ${filePath}: ${JSON.stringify(result.errors)}`);
  }

  const jsCode = result.outputFiles[0].text;
  return jsCode;
}

// Function to extract data from a built JS module
async function extractDataFromTs(filePath) {
  const jsCode = await buildTsFile(filePath);
  
  // Create a temporary file
  const tempFile = path.join(__dirname, '__temp_data.js');
  fs.writeFileSync(tempFile, jsCode);
  
  try {
    // Import the data
    delete require.cache[require.resolve(tempFile)];
    const data = require(tempFile);
    return data.default || data;
  } finally {
    // Clean up
    fs.unlinkSync(tempFile);
  }
}

// Function to insert a page into the database
async function insertPage(client, pageKey, pageData) {
  console.log(`Importing page: ${pageKey}`);
  
  // Insert the main page record
  const pageResult = await client.query(
    `INSERT INTO content_pages 
     (page_key, heading, subheading, image_url) 
     VALUES ($1, $2, $3, $4) 
     ON CONFLICT (page_key) 
     DO UPDATE SET 
       heading = EXCLUDED.heading, 
       subheading = EXCLUDED.subheading, 
       image_url = EXCLUDED.image_url,
       updated_at = CURRENT_TIMESTAMP
     RETURNING id`,
    [pageKey, pageData.heading, pageData.subheading, pageData.image]
  );
  
  const pageId = pageResult.rows[0].id;
  
  // Handle common page sections
  if (pageData.heroText) {
    await client.query(
      `INSERT INTO content_sections 
       (page_id, section_key, heading, order_index) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (page_id, section_key) 
       DO UPDATE SET 
         heading = EXCLUDED.heading, 
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [pageId, 'hero', pageData.heroText, 0]
    );
  }
  
  // Handle CTA section
  if (pageData.ctaHeading) {
    const ctaResult = await client.query(
      `INSERT INTO content_sections 
       (page_id, section_key, heading, subheading, button_text, order_index) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (page_id, section_key) 
       DO UPDATE SET 
         heading = EXCLUDED.heading, 
         subheading = EXCLUDED.subheading, 
         button_text = EXCLUDED.button_text,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [pageId, 'cta', pageData.ctaHeading, pageData.ctaSubheading, pageData.ctaButtonText, 20]
    );
  }
  
  // Handle services section
  if (pageData.servicesHeading) {
    const servicesResult = await client.query(
      `INSERT INTO content_sections 
       (page_id, section_key, heading, subheading, order_index) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (page_id, section_key) 
       DO UPDATE SET 
         heading = EXCLUDED.heading, 
         subheading = EXCLUDED.subheading,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [pageId, 'services', pageData.servicesHeading, pageData.servicesSubheading, 10]
    );
    
    const sectionId = servicesResult.rows[0].id;
    
    // Clear existing items to prevent duplicates
    await client.query('DELETE FROM content_items WHERE section_id = $1', [sectionId]);
    
    // Insert service items
    if (pageData.services && Array.isArray(pageData.services)) {
      for (let i = 0; i < pageData.services.length; i++) {
        const service = pageData.services[i];
        await client.query(
          `INSERT INTO content_items 
           (section_id, title, description, icon, order_index) 
           VALUES ($1, $2, $3, $4, $5)`,
          [sectionId, service.title, service.description, service.icon, i]
        );
      }
    }
  }
  
  // Handle body content for all pages
  if (pageData.body && Array.isArray(pageData.body)) {
    // Clear existing items to prevent duplicates
    await client.query('DELETE FROM content_items WHERE section_id IN (SELECT id FROM content_sections WHERE page_id = $1 AND section_key = $2)', [pageId, 'body']);
    
    // Create body section if it doesn't exist
    const bodySectionResult = await client.query(
      `INSERT INTO content_sections 
       (page_id, section_key, order_index) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (page_id, section_key) 
       DO UPDATE SET updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [pageId, 'body', 5]
    );
    
    const bodySectionId = bodySectionResult.rows[0].id;
    
    // Insert body items
    for (let i = 0; i < pageData.body.length; i++) {
      const item = pageData.body[i];
      await client.query(
        `INSERT INTO content_items 
         (section_id, title, description, icon, image_url, order_index) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [bodySectionId, item.title, item.description, item.icon, item.image, i]
      );
    }
  }
  
  console.log(`Page ${pageKey} imported successfully`);
}

// Main function to import all data
async function importAllData() {
  const client = await pool.connect();
  
  try {
    // Start a transaction
    await client.query('BEGIN');
    
    // First, create the schema if it doesn't exist
    const schemaPath = path.join(__dirname, '../db/migrations/content-schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    
    // Get all TypeScript files in the data directory
    const files = fs.readdirSync(DATA_DIR).filter(file => file.endsWith('.ts'));
    
    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      const pageKey = file.replace(/Page\.ts$/, '').toLowerCase();
      
      try {
        const data = await extractDataFromTs(filePath);
        await insertPage(client, pageKey, data);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        throw error; // This will trigger the ROLLBACK
      }
    }
    
    // Commit the transaction
    await client.query('COMMIT');
    console.log('All content imported successfully!');
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('Error importing data:', error);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

// Run the import
importAllData();
