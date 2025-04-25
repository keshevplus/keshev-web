# Keshev Web Deployment Script

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Starting production deployment process..." -ForegroundColor Green

try {
    # Step 1: Navigate to the client directory and build the client
    Write-Host "Building the client application..." -ForegroundColor Cyan
    Set-Location -Path "$projectRoot\client"
    
    Write-Host "Building client..." -ForegroundColor Cyan
    & pnpm run build
    if ($LASTEXITCODE -ne 0) { throw "Client build failed with exit code $LASTEXITCODE" }

    # Step 2: Return to project root
    Set-Location -Path $projectRoot

    # Step 3: Add all changes to Git
    Write-Host "Adding changes to Git..." -ForegroundColor Cyan
    & git add .
    if ($LASTEXITCODE -ne 0) { throw "Failed to add changes to Git" }

    # Step 4: Commit changes
    $commitMessage = Read-Host -Prompt "Enter commit message"
    & git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) { throw "Failed to commit changes" }

    # Step 5: Push changes to the main branch
    Write-Host "Pushing changes to the main branch..." -ForegroundColor Cyan
    & git push origin main
    if ($LASTEXITCODE -ne 0) { throw "Failed to push changes to main branch" }

    # Step 6: Deploy to Heroku
    Write-Host "Deploying to Heroku..." -ForegroundColor Cyan
    & heroku git:remote -a keshevplus
    if ($LASTEXITCODE -ne 0) { throw "Failed to set Heroku remote" }

    & git push heroku main
    if ($LASTEXITCODE -ne 0) { throw "Failed to push to Heroku" }

    Write-Host "Deployment process completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
} finally {
    # Always return to the project root
    Set-Location -Path $projectRoot
}

Read-Host -Prompt "Press Enter to exit"
