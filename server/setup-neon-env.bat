@echo off
echo Setting up Neon database environment variable...

echo NEON_DATABASE_URL=postgresql://keshevplus_owner:npg_cAU7Ctf3OmKz@ep-still-hat-a4dtitql-pooler.us-east-1.aws.neon.tech/keshevplus?sslmode=require> temp_env.txt

:: Copy all other environment variables (except any existing NEON_DATABASE_URL)
type .env | findstr /v "NEON_DATABASE_URL" >> temp_env.txt

move /y temp_env.txt .env

echo Neon database URL has been added to your .env file.
echo You can now run your migration script.
