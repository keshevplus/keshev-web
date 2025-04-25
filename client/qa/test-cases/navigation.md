# Navigation Test Cases

## TC-N01: Main Navigation Links

**Objective**: Verify that all main navigation links work correctly.

**Preconditions**:
- Application is running
- User is on any page

**Test Steps**:
1. Click on each main navigation link in the navbar
2. Observe page transitions and URL changes
3. Test in both desktop and mobile viewport sizes

**Expected Results**:
- Each link navigates to the correct route
- URL changes appropriately for each page
- Content relevant to the selected page is displayed
- Active link is visually distinguished
- Mobile navigation menu opens/closes correctly

## TC-N02: Direct URL Access

**Objective**: Verify that all main pages can be accessed directly via URL.

**Preconditions**:
- Application is running

**Test Steps**:
1. Type or paste each of the following URLs directly in the browser:
   - `/`
   - `/contact`
   - `/about`
   - `/services`
   - `/admin`
2. Refresh each page after initial load

**Expected Results**:
- Each URL loads the correct page directly
- Refreshing the page maintains the correct content (no 404 errors)
- Authentication-protected routes redirect to login if not authenticated

## TC-N03: Browser Navigation Controls

**Objective**: Verify that browser back/forward buttons work correctly.

**Preconditions**:
- Application is running
- Browser history is clear or at the application's home page

**Test Steps**:
1. Navigate through a series of pages using application links (e.g., Home → About → Contact)
2. Use browser back button multiple times
3. Use browser forward button multiple times

**Expected Results**:
- Browser back button navigates to the previously visited page
- Browser forward button navigates forward through history
- Page state is maintained correctly (e.g., form data, scroll position)

## TC-N04: 404 Page

**Objective**: Verify that non-existent routes display the 404 page.

**Preconditions**:
- Application is running

**Test Steps**:
1. Type a non-existent route in the browser (e.g., `/this-page-does-not-exist`)
2. Observe the response

**Expected Results**:
- A 404 page is displayed
- The 404 page contains navigation elements to return to valid pages
- The URL remains the incorrect route

## TC-N05: Mobile Navigation Menu

**Objective**: Verify that the mobile navigation menu works correctly.

**Preconditions**:
- Application is running
- Browser viewport is set to mobile width (< 768px)

**Test Steps**:
1. Observe the navigation bar in mobile view
2. Click the hamburger/menu icon
3. Click each navigation link in the mobile menu
4. Click outside the menu or the close button

**Expected Results**:
- The hamburger/menu icon is visible on mobile viewport
- Clicking the icon opens the mobile navigation menu
- All links in the mobile menu work correctly
- Clicking outside the menu or the close button closes the menu
- The menu closes automatically after selecting a link
