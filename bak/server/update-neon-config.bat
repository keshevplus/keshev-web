@echo off
echo Updating Neon database configuration...

echo NEON_DATABASE_URL=postgresql://keshevplus_owner:npg_cAU7Ctf3OmKz@ep-still-hat-a4dtitql-pooler.us-east-1.aws.neon.tech/keshevplus?sslmode=require> temp_env.txt

type .env | findstr /v "NEON_DATABASE_URL" >> temp_env.txt

move /y temp_env.txt .env

echo Neon database configuration updated successfully!
