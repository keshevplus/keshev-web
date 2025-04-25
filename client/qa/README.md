# Keshev Plus QA Documentation

This directory contains all Quality Assurance documentation and testing resources for the Keshev Plus client application.

## Directory Structure

- `/docs` - Testing guidelines, checklist templates, and process documentation
- `/mock-data` - Mock data files for testing various scenarios
- `/test-cases` - Structured test cases organized by feature
- `/test-reports` - Template and examples for test reports

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- PNPM package manager
- Git

### Setup for Testing

1. Clone the repository if you haven't already:
   ```
   git clone <repository-url>
   cd keshev-web
   ```

2. Switch to the client-dev branch:
   ```
   git checkout client-dev
   ```

3. Install dependencies using pnpm:
   ```
   cd client
   pnpm install
   ```

4. Start the development server:
   ```
   pnpm dev
   ```

5. In a separate terminal, start the backend server:
   ```
   cd ../server
   pnpm install
   node server.js
   ```

## Testing Process

1. Review test cases in the `/test-cases` directory for the feature you're testing
2. Use appropriate mock data from the `/mock-data` directory
3. Document issues using the bug template in the `BUGS.md` file in the client directory
4. Generate test reports using the templates in `/test-reports`

## Key Test Areas

- User Interface & Responsiveness
- Form Validation
- Navigation & Routing
- Data Display
- Error Handling
- Performance

Refer to the documentation in the `/docs` folder for detailed testing procedures and guidelines.
