@echo off
echo Setting up JWT configuration...

:: Generate a secure random JWT secret key if not already present
for /f "tokens=*" %%a in ('node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"') do set JWT_SECRET=%%a

:: Create a temporary file with JWT_SECRET
echo JWT_SECRET=%JWT_SECRET%> temp_env.txt

:: Copy all other environment variables (except any existing JWT_SECRET)
type .env | findstr /v "JWT_SECRET" >> temp_env.txt

:: Replace the .env file with our temporary file
move /y temp_env.txt .env

echo JWT secret has been added to your .env file.
echo You can now restart your server to apply the changes.
