require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// Check if NEON_DATABASE_URL is set
if (!process.env.NEON_DATABASE_URL) {
  console.error('Error: NEON_DATABASE_URL environment variable is not set.');
  console.error('Please add it to your .env file, e.g.:');
  console.error('NEON_DATABASE_URL=postgres://postgres:process.env.DB_PASSWORD@hostname/database');
  process.exit(1);
}

// Function to split SQL statements correctly, handling complex statements with semicolons in strings and quotes
function splitSqlStatements(sqlDump) {
  const statements = [];
  let currentStatement = '';
  let insideString = false;
  let stringChar = '';
  let escaped = false;
  
  for (let i = 0; i < sqlDump.length; i++) {
    const char = sqlDump[i];
    currentStatement += char;
    
    if (escaped) {
      escaped = false;
      continue;
    }
    
    if (char === '\\') {
      escaped = true;
      continue;
    }
    
    if (!insideString && (char === "'" || char === '"')) {
      insideString = true;
      stringChar = char;
      continue;
    }
    
    if (insideString && char === stringChar) {
      insideString = false;
      continue;
    }
    
    if (!insideString && char === ';') {
      statements.push(currentStatement.trim());
      currentStatement = '';
    }
  }
  
  if (currentStatement.trim()) {
    statements.push(currentStatement.trim());
  }
  
  return statements;
}

async function importDatabase() {
  try {
    console.log('Starting import to Neon database...');
    const sql = neon(process.env.NEON_DATABASE_URL);
    
    // Read the SQL dump file
    const sqlDumpPath = path.join(__dirname, '../../keshevplus_backup.sql');
    console.log(`Reading SQL dump from ${sqlDumpPath}`);
    const sqlDump = fs.readFileSync(sqlDumpPath, 'utf8');
    
    // Split the dump into individual statements
    console.log('Parsing SQL statements...');
    const statements = splitSqlStatements(sqlDump);
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        if (statement.trim()) {
          // Neon requires using tagged template literals
          await sql`${statement}`;
          successCount++;
          
          // Log progress every 10 statements
          if (successCount % 10 === 0) {
            console.log(`Progress: ${successCount}/${statements.length} statements executed`);
          }
        }
      } catch (error) {
        errorCount++;
        const errorInfo = {
          statementIndex: i,
          error: error.message,
          statementPreview: statement.length > 100 ? `${statement.substring(0, 100)}...` : statement
        };
        errors.push(errorInfo);
        console.error(`Error executing statement ${i + 1}:`, error.message);
      }
    }
    
    console.log('\nImport summary:');
    console.log(`Total statements: ${statements.length}`);
    console.log(`Successfully executed: ${successCount}`);
    console.log(`Failed: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('\nEncountered errors during import:');
      errors.forEach((err, index) => {
        console.log(`\nError ${index + 1}:`);
        console.log(`Statement: ${err.statementPreview}`);
        console.log(`Error message: ${err.error}`);
      });
      
      // Write errors to file for reference
      const errorLogPath = path.join(__dirname, 'neon-import-errors.json');
      fs.writeFileSync(errorLogPath, JSON.stringify(errors, null, 2));
      console.log(`\nDetailed error log written to ${errorLogPath}`);
    }
    
    if (successCount === statements.length) {
      console.log('\nDatabase import completed successfully!');
    } else {
      console.log('\nDatabase import completed with errors.');
    }
    
  } catch (error) {
    console.error('Fatal error during import:', error);
  }
}

// Run the import function
importDatabase().catch(error => {
  console.error('Unhandled error during import:', error);
  process.exit(1);
});
