:: filepath: c:\code\new\keshev-web\scripts\deploy.bat
@echo off
setlocal enabledelayedexpansion

:: Set the project root directory to the directory containing this script
set "PROJECT_ROOT=%~dp0.."

echo Starting production deployment process...

:: Step 1: Navigate to the client directory and build the client
echo Building the client application...
cd /d "%PROJECT_ROOT%\client"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to navigate to client directory.
    exit /b 1
)

:: Skip installing dependencies as they seem to have issues
echo Building client...
pnpm run build
if not %ERRORLEVEL% == 0 (
    echo Error: Client build failed.
    exit /b 1
)

:: Step 2: Navigate to the server directory and build the server
echo Building the server application...
cd /d "%PROJECT_ROOT%\server"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to navigate to server directory.
    exit /b 1
)

:: Skip installing dependencies as they seem to have issues
echo Building server...
pnpm run build
if not %ERRORLEVEL% == 0 (
    echo Error: Server build failed.
    exit /b 1
)

:: Step 3: Return to project root
cd /d "%PROJECT_ROOT%"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to return to project root.
    exit /b 1
)

:: Step 4: Add all changes to Git
echo Adding changes to Git...
git add .
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to add changes to Git.
    exit /b 1
)

:: Step 5: Commit changes
set /p commit_message=Enter commit message: 
git commit -m "%commit_message%"
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to commit changes.
    exit /b 1
)

:: Step 6: Push changes to the main branch
echo Pushing changes to the main branch...
git push origin main
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to push changes to main branch.
    exit /b 1
)

:: Step 7: Deploy to Heroku
echo Deploying to Heroku...
heroku git:remote -a keshevplus
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to set Heroku remote.
    exit /b 1
)

git push heroku main
if not %ERRORLEVEL% == 0 (
    echo Error: Failed to push to Heroku.
    exit /b 1
)

echo Deployment process completed successfully!
pause
exit /b 0