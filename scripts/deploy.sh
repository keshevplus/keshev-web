#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting production deployment process..."

# Step 1: Navigate to the client directory and build the client
echo "Building the client application..."
cd client
pnpm install
pnpm run build
cd ..

# Step 2: Navigate to the server directory and build the server
echo "Building the server application..."
cd server
pnpm install
pnpm run build
cd ..

# Step 3: Add all changes to Git
echo "Adding changes to Git..."
git add .

# Step 4: Commit changes
echo "Committing changes..."
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"

# Step 5: Push changes to the main branch
echo "Pushing changes to the main branch..."
git push origin main

# Step 6: Deploy to Heroku
echo "Deploying to Heroku..."
heroku git:remote -a keshevplus
git push heroku main

echo "Deployment process completed successfully!"
