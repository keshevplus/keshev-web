@echo off
echo Keshev+ API Leads Test Runner
echo =============================

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js to run this test
    exit /b 1
)

REM Check if an auth token was provided
if "%~1"=="" (
    echo No auth token provided. Checking for .env file...
    
    REM Check if .env files exist and set environment variables
    if exist .env.local (
        echo Found .env.local file, trying to extract token...
        for /f "tokens=1,2 delims==" %%a in (.env.local) do (
            if not "%%a"=="#" set %%a=%%b
        )
    ) else if exist .env (
        echo Found .env file, trying to extract token...
        for /f "tokens=1,2 delims==" %%a in (.env) do (
            if not "%%a"=="#" set %%a=%%b
        )
    )
    
    REM Check if we have a token now
    if "%TEST_AUTH_TOKEN%"=="" (
        echo No TEST_AUTH_TOKEN found in environment or .env files.
        echo You can provide a token as the first argument:
        echo   test-leads-api.bat YOUR_AUTH_TOKEN
        echo Or set it in .env.local:
        echo   TEST_AUTH_TOKEN=your_token_here
        exit /b 1
    )
) else (
    REM Use the provided token
    set TEST_AUTH_TOKEN=%~1
)

echo Running leads API tests...
node test-leads-api.js
echo.
echo Test completed.
