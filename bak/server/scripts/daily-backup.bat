@echo off
echo Starting daily Neon database backup...

:: Navigate to the server directory
cd /d "%~dp0.."

:: Run the backup script using pnpm
pnpm node scripts/backup-neon-to-local.js

echo Backup completed at %date% %time%

:: Exit with success code
exit /b 0
