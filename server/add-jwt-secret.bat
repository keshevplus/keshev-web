@echo off
echo Adding JWT_SECRET to environment variables...

:: Generate a random JWT secret using Node.js
for /f "tokens=*" %%a in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set JWT_SECRET=%%a

:: Create a temporary file with the existing env content plus the new JWT_SECRET
echo JWT_SECRET=%JWT_SECRET%> temp_env.txt

:: Copy all other environment variables (excluding any existing JWT_SECRET)
type .env | findstr /v "JWT_SECRET" >> temp_env.txt

:: Replace the .env file with our temporary file
move /y temp_env.txt .env

echo JWT_SECRET has been added to your .env file.
