# Keshev Plus Testing Guidelines

## General Testing Principles

1. **Test Early, Test Often** - Testing should be integrated throughout the development process
2. **Be Methodical** - Follow test cases systematically 
3. **Document Everything** - Record all test results, bugs, and observations
4. **Edge Cases Matter** - Test boundary conditions and unusual inputs
5. **Cross-Browser & Cross-Device** - Test on multiple browsers and device form factors

## Testing Workflow

1. **Test Plan Review** - Review test cases before beginning testing
2. **Environment Setup** - Ensure environment is clean and properly configured
3. **Test Execution** - Systematically execute test cases
4. **Bug Reporting** - Document issues in client BUGS.md with clear steps to reproduce
5. **Regression Testing** - After fixes, verify both the fix and that nothing else broke

## Testing Types

### Functional Testing
Validate that each feature works according to requirements. Use test cases in the test-cases directory.

### Responsive Design Testing
Test all pages at various screen sizes:
- Mobile (≤ 640px)
- Tablet (641px - 1024px)
- Desktop (≥ 1025px)

### Form Validation Testing
Test all forms with:
- Valid inputs
- Invalid inputs
- Empty required fields
- Maximum character limits
- Special characters
- Hebrew text (RTL) handling

### Navigation Testing
Verify all links and navigation elements:
- Internal links work correctly
- External links open properly
- Browser back/forward buttons work
- Route parameters are handled correctly
- 404 page appears for invalid routes

### Performance Testing
Check for:
- Page load times
- Smooth animations and transitions
- Responsiveness of UI elements

### Accessibility Testing
Verify:
- Keyboard navigation
- Color contrast
- Text scaling
- Screen reader compatibility

## Bug Severity Classifications

- **Critical**: Application crash, data loss, security issue
- **High**: Major feature not working, blocking functionality
- **Medium**: Feature partially broken but workaround exists
- **Low**: Minor visual issues, non-blocking problems

## Test Environment

### Development Environment
- Client: `pnpm dev` (Default port: 5173)
- Server: `node server.js` (Default port: 5000)

### Test Data
Use mock data from the mock-data directory for consistent testing.
