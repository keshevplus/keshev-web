@echo off
echo Fixing Neon database configuration...

:: Update the Neon connection string to use the original database name
echo NEON_DATABASE_URL=postgresql://keshevplus_owner:npg_cAU7Ctf3OmKz@ep-still-hat-a4dtitql-pooler.us-east-1.aws.neon.tech/keshevplus?sslmode=require> temp_env.txt

:: Copy all other environment variables
type .env | findstr /v "NEON_DATABASE_URL" >> temp_env.txt

move /y temp_env.txt .env

echo Neon database configuration fixed. Local database remains keshev-web, but Neon database connection restored to original name.
