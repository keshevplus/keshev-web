#!/bin/bash

# Colors
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
NC="\033[0m" # No Color

echo -e "${YELLOW}Keshev+ API Leads Test Runner${NC}"
echo -e "${CYAN}=============================${NC}"

# Check if an auth token was provided
if [ -z "$1" ]; then
  echo -e "${YELLOW}No auth token provided. Checking for .env file...${NC}"
  
  # Check if .env file exists
  if [ -f ".env.local" ]; then
    echo -e "${GREEN}Found .env.local file, trying to extract token...${NC}"
    export $(grep -v '^#' .env.local | xargs)
  elif [ -f ".env" ]; then
    echo -e "${GREEN}Found .env file, trying to extract token...${NC}"
    export $(grep -v '^#' .env | xargs)
  fi
  
  # Check if we now have a token
  if [ -z "$TEST_AUTH_TOKEN" ]; then
    echo -e "${YELLOW}No TEST_AUTH_TOKEN found in environment or .env files.${NC}"
    echo -e "${YELLOW}You can provide a token as the first argument:${NC}"
    echo -e "${CYAN}  ./test-leads-api.sh YOUR_AUTH_TOKEN${NC}"
    echo -e "${YELLOW}Or set it in .env.local:${NC}"
    echo -e "${CYAN}  TEST_AUTH_TOKEN=your_token_here${NC}"
    exit 1
  fi
else
  # Use the provided token
  export TEST_AUTH_TOKEN=$1
fi

# Run the test script
echo -e "${GREEN}Running leads API tests...${NC}"
node test-leads-api.js
