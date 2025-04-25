# Keshev Plus QA Test Checklist

## Pre-Testing Setup

- [ ] Checkout the client-dev branch
- [ ] Install dependencies with `pnpm install`
- [ ] Start the client application with `pnpm dev`
- [ ] Start the server with `node server.js`
- [ ] Clear browser cache and cookies

## Responsive Design Testing

### Mobile View (≤ 640px)
- [ ] All pages render correctly
- [ ] Navigation menu appears as a hamburger icon
- [ ] Form elements are properly sized
- [ ] Text is readable
- [ ] Images scale appropriately

### Tablet View (641px - 1024px)
- [ ] All pages render correctly
- [ ] UI elements adapt to medium screen width
- [ ] Navigation displays properly
- [ ] No horizontal scrolling needed

### Desktop View (≥ 1025px)
- [ ] All pages render correctly
- [ ] UI takes advantage of additional screen space
- [ ] Navigation displays full menu

## Page-Specific Tests

### Home Page
- [ ] Hero section displays correctly
- [ ] All sections load with proper content
- [ ] All images load correctly
- [ ] Links to other pages work

### Contact Page
- [ ] Form displays all fields correctly
- [ ] Required field validation works
- [ ] Error messages appear appropriately
- [ ] Form submits successfully with valid data
- [ ] Reset button clears the form
- [ ] Success message appears after submission
- [ ] Redirect works after successful submission

### Admin Area
- [ ] Login form works correctly
- [ ] Authentication enforced for protected routes
- [ ] Lead information is displayed correctly
- [ ] Admin can view submitted contact forms
- [ ] Sorting and filtering of leads works
- [ ] Pagination works if applicable

## Performance Testing

- [ ] Pages load within acceptable time (< 3 seconds)
- [ ] No visible lag when interacting with UI elements
- [ ] Animations are smooth
- [ ] Images are optimized for web

## Cross-Browser Testing

### Chrome
- [ ] All functionality works as expected
- [ ] UI renders correctly

### Firefox
- [ ] All functionality works as expected
- [ ] UI renders correctly

### Safari (if available)
- [ ] All functionality works as expected
- [ ] UI renders correctly

### Edge
- [ ] All functionality works as expected
- [ ] UI renders correctly

## Error Handling

- [ ] Server errors are handled gracefully
- [ ] Network failures show appropriate error messages
- [ ] Form validation provides clear error messages
- [ ] 404 page works for invalid routes

## Content & Text

- [ ] All Hebrew text displays correctly (RTL)
- [ ] No spelling or grammar errors
- [ ] Content is properly aligned
- [ ] Typography is consistent

## Documentation

- [ ] Record all bugs in `BUGS.md`
- [ ] Document test results
- [ ] Update `TASKS.md` with any new development tasks identified
