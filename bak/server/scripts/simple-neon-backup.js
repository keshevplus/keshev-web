require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create backup directory if it doesn't exist
const BACKUP_DIR = path.join(__dirname, '../backups');
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Get today's date for the filename
const date = new Date();
const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
const backupFile = path.join(BACKUP_DIR, `neon-backup-${dateString}.sql`);

// Get database connection details from environment variables
const dbUrl = process.env.NEON_DATABASE_URL;

if (!dbUrl) {
  console.error('Error: NEON_DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Parse connection string (postgresql://user:password@host/database)
const connRegex = /postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/;
const connMatch = dbUrl.match(connRegex);

if (!connMatch) {
  console.error('Error: Invalid database connection string format');
  process.exit(1);
}

const user = connMatch[1];
const password = connMatch[2];
const host = connMatch[3];
const database = connMatch[4];

console.log(`Starting Neon database backup (${dateString})...`);
console.log(`Backup will be saved to: ${backupFile}`);

// Create pg_dump command
const pgDumpCommand = `set "PGPASSWORD=${password}" && pg_dump -h ${host} -U ${user} -d ${database} -f "${backupFile}" --no-owner --no-acl`;

// Execute the backup
exec(pgDumpCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: Failed to create backup: ${error.message}`);
    return;
  }
  
  console.log(`Backup completed successfully!`);
  
  // Cleanup old backups (keep last 7 days)
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.startsWith('neon-backup-'))
    .map(file => ({
      name: file,
      path: path.join(BACKUP_DIR, file),
      time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time); // Sort newest first
  
  if (files.length > 7) {
    console.log(`Keeping last 7 backups, removing ${files.length - 7} older backups...`);
    
    files.slice(7).forEach(file => {
      fs.unlinkSync(file.path);
      console.log(`Deleted old backup: ${file.name}`);
    });
  }
});
