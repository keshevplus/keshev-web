# Client Development Branch

## Overview
This is the development branch for the Keshev Plus client-side application. All new features, bug fixes, and improvements should be developed and tested here before being merged into the main branch.

## Development Workflow

1. **Starting Development**:
   - Ensure you're on the `client-dev` branch: `git checkout client-dev`
   - Pull the latest changes: `git pull origin client-dev`
   - Install dependencies if needed: `pnpm install`

2. **Making Changes**:
   - Create feature branches for significant changes: `git checkout -b feature/your-feature-name`
   - Document bugs in `BUGS.md`
   - Track development tasks in `TASKS.md`

3. **Testing Changes**:
   - Run the development server: `pnpm dev`
   - Ensure all components render correctly
   - Test on multiple screen sizes for responsiveness

4. **Committing Changes**:
   - Commit with descriptive messages
   - Reference task or bug IDs: `git commit -m "Fix navbar responsiveness (C-001)"`

5. **Merging to Main**:
   - Create a pull request from `client-dev` to `main`
   - Ensure all tests pass
   - Request code review before merging

## Bug Tracking
All client-side bugs should be documented in the `BUGS.md` file with a unique identifier (C-XXX).

## Task Management
Development tasks are tracked in the `TASKS.md` file. Update task status as you work.

## Development Conventions

- Use TypeScript for all new components
- Follow the existing code style and component patterns
- Prefer functional components with hooks
- Use pnpm as the package manager
- Keep dependencies up to date
