# Registration Form Automation Project

## 📌 Project Overview
This project demonstrates a complete **web-based registration form** along with **automation testing using Selenium WebDriver and TestNG**.  
The automation validates form behavior, field validations, dropdown dependencies, password strength checks, and submission behavior.

This project is created as part of an **automation testing assessment**.

---

## 🧩 Technologies Used

### Web Application
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Automation Testing
- Java
- Selenium WebDriver
- TestNG
- Maven
- Eclipse IDE

---

## 📁 Project Structure

registration-form-automation/
|
|-- web-source/
|   |-- index.html
|   |-- style.css
|   |-- script.js
|
|-- automation-tests/
|   |-- src/test/java/automation/RegistrationTest.java
|   |-- pom.xml
|   |-- test-output/
|   |-- success-state.png
|   |-- error-state.png
|
|-- README.md


---

## 🌐 Web Application Description

The registration form includes the following features:
- First Name & Last Name validation
- Email validation (including disposable email blocking)
- Country → State → City dependent dropdowns
- Phone number validation based on selected country
- Password strength indicator (Weak / Medium / Strong)
- Confirm password validation
- Gender selection validation
- Terms & conditions acceptance
- Submit button disabled until all required fields are valid

---

## 🤖 Automation Test Coverage

The Selenium automation validates:

- Password strength indicator updates correctly
- Country selection updates state dropdown
- State selection updates city dropdown
- Error message shown for missing required fields
- Error message shown for mismatched passwords
- Successful form submission with valid data
- Submit button behavior validation
- Screenshot capture on success and error states

---

## 🧪 How Automation Script Works (Step-by-Step)

1. Launches Chrome browser using Selenium WebDriver
2. Loads the registration form locally using file URL
3. Locates form elements using XPath and ID locators
4. Enters valid and invalid input data
5. Triggers form validation events
6. Verifies validation messages using assertions
7. Checks dropdown dependency behavior
8. Submits form when all inputs are valid
9. Captures screenshots for success and error scenarios
10. Closes browser after test execution

---

## ▶️ How to Run Automation Tests

### Using Eclipse (Recommended)

1. Open Eclipse IDE
2. Import the project as **Existing Maven Project**
3. Navigate to:
    automation-tests/src/test/java/automation/RegistrationTest.java
4. Right-click → **Run As → TestNG Test**
5. Observe execution in Chrome browser
6. Test results will appear in:
    automation-tests/test-output/

---

## 📸 Screenshots

- `success-state.png` → Captured after successful form submission
- `error-state.png` → Captured when validation errors occur

---

## 🎥 Automation Execution Video

A screen recording demonstrates:
- Form interaction
- Field validation
- Submit behavior
- Automated execution using Selenium

---

## 📤 Submission Notes

- Complete source code is included in this repository
- Automation scripts are included under `automation-tests`
- Screenshots are provided for validation
- Video recording demonstrates execution flow

---

## 👤 Author

**Shivansh Dixit**  
UPES  
Automation Testing Assignment

---

✅ **End of README**
