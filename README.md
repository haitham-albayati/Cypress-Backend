# Cypress Test Automation Framework (Frontend + Backend)

This project is a **Cypress Test Automation Framework** built using **Page Object Model (POM)** for frontend UI tests and backend API testing support. The framework is designed for demonstration purposes with **random example applications**, showcasing best practices in test automation.

---

## 📦 Project Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Open Cypress Test Runner
```bash
npx cypress open
```

### 4. Run Tests in CLI
```bash
npx cypress run
```

---

## 🧩 Cypress Commands & Methods

### Built-in Commands
- `cy.visit(url)` – Navigate to a page
- `cy.get(locator)` – Get element by locator
- `cy.contains(text)` – Find element with text
- `cy.type(value)` – Type into input field
- `cy.click()` – Click element
- `cy.request(options)` – Make API request
- `cy.intercept()` – Stub/spy network calls
- `cy.wait(time)` – Explicit wait
- `cy.should(condition)` – Assertion
- `cy.url()` – Get current URL

### Assertions
- `should('be.visible')`
- `should('have.text', 'expectedText')`
- `should('have.value', 'expectedValue')`
- `should('include', '/dashboard')`
- `should('eq', 200)` for API status checks

### Custom Commands (`cypress/support/commands.js`)
Example UI login command:
```javascript
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});
```
Example API custom command:
```javascript
Cypress.Commands.add('apiLogin', (username, password) => {
  cy.request('POST', '/api/auth/login', {
    username: username,
    password: password
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env('token', response.body.token);
  });
});
```

---

## 🎯 Locators Strategy (UI)

- Use `data-testid` or `data-cy` attributes when available
- Prefer **unique IDs** (`#id`)
- Use **class names** (`.classname`) with caution
- Use **contains()** for text-based elements

Examples:
```javascript
cy.get('#username'); // By ID
cy.get('.btn-primary'); // By class
cy.contains('Submit'); // By text
cy.get('[data-cy="login-btn"]'); // By data attribute
```

---

## 🏗️ Page Object Model (POM)

### Example: `pages/LoginPage.js`
```javascript
class LoginPage {
  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),
    loginButton: () => cy.get('#login-button')
  }

  login(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}

module.exports = new LoginPage();
```

### Example: `pages/DashboardPage.js`
```javascript
class DashboardPage {
  elements = {
    welcomeMessage: () => cy.get('.welcome-msg'),
    logoutButton: () => cy.get('#logout')
  }

  verifyLogin() {
    this.elements.welcomeMessage().should('be.visible');
  }

  logout() {
    this.elements.logoutButton().click();
  }
}

module.exports = new DashboardPage();
```

### Example UI Test: `e2e/random-ui.spec.cy.js`
```javascript
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

describe('Random UI Tests', () => {
  beforeEach(() => {
    cy.visit('https://example-random-app.com');
  });

  it('Should login successfully', () => {
    LoginPage.login('user1', 'password123');
    DashboardPage.verifyLogin();
  });

  it('Should logout successfully', () => {
    LoginPage.login('user1', 'password123');
    DashboardPage.logout();
    cy.url().should('include', '/login');
  });
});
```

---

## 🔗 Backend API Testing

Cypress supports backend API testing using `cy.request()`.

### Example API Test: `e2e/random-api.spec.cy.js`
```javascript
describe('API Testing - Random Backend', () => {
  it('Should return a valid token on login', () => {
    cy.request('POST', '/api/auth/login', {
      username: 'user1',
      password: 'password123'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('Should fetch items list with token', () => {
    cy.request({
      method: 'GET',
      url: '/api/items',
      headers: { Authorization: `Bearer ${Cypress.env('token')}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('items');
    });
  });
});
```

### API Test Data Management
- Store credentials in `cypress/fixtures/user.json`
- Use `Cypress.env()` for tokens/secrets
- Use custom commands for repeated requests

---

## 📊 Reporting

You can integrate **Mochawesome** or **Allure** for reports.

Example (Mochawesome):
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

Update `cypress.config.js` reporter:
```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
```

---

## ✅ Best Practices

- Use **POM** for frontend UI tests
- Use **fixtures** for test data (UI + API)
- Keep tests **independent & atomic**
- Use **custom commands** for repeated UI/API flows
- Validate **status codes, schema, and response time** in API tests
- Integrate **reporting & CI/CD** (GitHub Actions, Jenkins, etc.)

---

## 🚀 Run with CI/CD

Example GitHub Actions Workflow (`.github/workflows/cypress.yml`):
```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx cypress run
```

---

## 🎉 Conclusion

This Cypress framework supports **Frontend (UI)** and **Backend (API)** testing with **Page Object Model (POM)**, **custom commands**, and **fixtures** for reusability. Examples use **random applications and endpoints** to demonstrate full-stack test automation best practices.
