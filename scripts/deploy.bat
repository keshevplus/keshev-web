:: filepath: c:\code\new\keshev-web\scripts\deploy.bat
@echo off
setlocal enabledelayedexpansion

:: Exit immediately if a command fails
set "ERRORLEVEL=0"

echo Starting production deployment process...

:: Step 1: Navigate to the client directory and build the client
echo Building the client application...
cd client
pnpm install || exit /b
pnpm run build || exit /b
cd ..

:: Step 2: Navigate to the server directory and build the server
echo Building the server application...
cd server
pnpm install || exit /b
pnpm run build || exit /b
cd ..

:: Step 3: Add all changes to Git
echo Adding changes to Git...
git add . || exit /b

:: Step 4: Commit changes
set /p commit_message="Enter commit message: "
git commit -m "%commit_message%" || exit /b

:: Step 5: Push changes to the main branch
echo Pushing changes to the main branch...
git push origin main || exit /b

:: Step 6: Deploy to Heroku
echo Deploying to Heroku...
heroku git:remote -a keshevplus || exit /b
git push heroku main || exit /b

echo Deployment process completed successfully!
pause