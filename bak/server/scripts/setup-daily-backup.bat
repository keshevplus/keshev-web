@echo off
echo Setting up daily Neon database backup task...

:: Get the current directory path
set "SCRIPT_DIR=%~dp0"
set "SERVER_DIR=%SCRIPT_DIR%.."

:: Full path to the backup script and batch file
set "BACKUP_SCRIPT=%SERVER_DIR%\scripts\simple-neon-backup.js"
set "BACKUP_BAT=%SERVER_DIR%\scripts\run-daily-backup.bat"

:: Create the batch file that will be executed by the scheduled task
echo @echo off > "%BACKUP_BAT%"
echo echo Running Neon database backup... >> "%BACKUP_BAT%"
echo cd /d "%SERVER_DIR%" >> "%BACKUP_BAT%"
echo pnpm node scripts/simple-neon-backup.js >> "%BACKUP_BAT%"
echo echo Backup completed at %%date%% %%time%% >> "%BACKUP_BAT%"

echo Batch file created: %BACKUP_BAT%

:: Create the scheduled task using schtasks command
schtasks /create /tn "KeshevWeb-NeonBackup" /tr "\"%BACKUP_BAT%\"" /sc DAILY /st 02:00 /ru "System" /f

echo.
echo Daily backup task has been scheduled to run every day at 2:00 AM.
echo The Neon database will be backed up to: %SERVER_DIR%\backups
echo.
echo To run a backup immediately for testing, use:
echo pnpm node scripts/simple-neon-backup.js

pause
