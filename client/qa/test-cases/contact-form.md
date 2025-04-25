# Contact Form Test Cases

## TC-C01: Submit Contact Form with Valid Data

**Objective**: Verify that the contact form can be successfully submitted with valid data.

**Preconditions**:
- Application is running
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Fill in the Name field with a valid name (e.g., "ישראל ישראלי")
3. Fill in the Email field with a valid email (e.g., "test@example.com")
4. Fill in the Phone field with a valid Israeli phone number (e.g., "0501234567")
5. Fill in the Subject field with a valid subject (e.g., "פנייה בנושא ייעוץ")
6. Fill in the Message field with a valid message (e.g., "זוהי הודעת בדיקה לטופס יצירת קשר")
7. Click the Submit button

**Expected Results**:
- Form is submitted successfully
- Success toast notification appears
- User is redirected to the home page after 1.5 seconds
- Data is sent to the server and stored correctly

## TC-C02: Validation Errors - Empty Required Fields

**Objective**: Verify that the form validation prevents submission with empty required fields.

**Preconditions**:
- Application is running
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Leave all fields empty
3. Click the Submit button

**Expected Results**:
- Form is not submitted
- Validation error messages appear for all required fields (Name, Email, Phone, Message)
- No server request is made

## TC-C03: Validation Errors - Invalid Email Format

**Objective**: Verify that the form validation catches invalid email format.

**Preconditions**:
- Application is running
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Fill in the Name field with a valid name
3. Fill in the Email field with an invalid email (e.g., "testexample.com", "test@", "@example.com")
4. Fill in other fields with valid data
5. Click the Submit button

**Expected Results**:
- Form is not submitted
- Validation error message appears for the Email field
- The error message indicates that a valid email is required

## TC-C04: Validation Errors - Invalid Phone Number

**Objective**: Verify that the form validation catches invalid Israeli phone numbers.

**Preconditions**:
- Application is running
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Fill in required fields with valid data except Phone
3. Fill in the Phone field with invalid numbers (e.g., "12345678", "050123456", "0501234567890")
4. Click the Submit button

**Expected Results**:
- Form is not submitted
- Validation error message appears for the Phone field
- The error message indicates that the phone number is invalid

## TC-C05: Reset Form Functionality

**Objective**: Verify that the Reset Form button clears all form fields.

**Preconditions**:
- Application is running
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Fill in all form fields with valid data
3. Click the Reset Form button

**Expected Results**:
- All form fields are cleared
- No validation error messages are displayed

## TC-C06: Form Submission with Network Error

**Objective**: Verify proper error handling when the server is unavailable.

**Preconditions**:
- Application is running
- Server is down or network connection is disabled
- User is on the Contact page

**Test Steps**:
1. Navigate to `/contact`
2. Fill in all form fields with valid data
3. Click the Submit button

**Expected Results**:
- An error toast notification appears
- Form data remains intact (not cleared)
- User remains on the Contact page
