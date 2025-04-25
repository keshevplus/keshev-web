@echo off
setlocal enabledelayedexpansion

:: Set the project root directory to the directory containing this script
set "PROJECT_ROOT=%~dp0.."

echo Starting the restart process...

:: Step 1: Navigate to the client directory and build the client
echo Building the client application...
cd /d "%PROJECT_ROOT%\client"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to navigate to client directory.
    exit /b 1
)

pnpm run build
if not %ERRORLEVEL% == 0 (
    echo Error: Build failed.
    exit /b 1
)

:: Step 2: Return to project root
cd /d "%PROJECT_ROOT%"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to return to project root.
    exit /b 1
)

:: Step 3: Add all changes to Git
echo Adding changes to Git...
git add .
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to add changes to Git.
    exit /b 1
)

:: Step 4: Commit changes
echo Committing changes...
git commit -m "Update build"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to commit changes.
    exit /b 1
)

:: Step 5: Push changes to main branch
echo Pushing changes to main branch...
git push origin main
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to push changes.
    exit /b 1
)

echo Restart process completed successfully!
exit /b 0
