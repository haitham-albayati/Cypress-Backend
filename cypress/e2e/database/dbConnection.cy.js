const BackendPage = require("../../pages/BackendPage");

describe("DB Connection", () => {
  const backendPage = new BackendPage();

  beforeEach(() => {
    cy.visit("/backend");
    cy.fixture("user").then(function (data) {
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.email = data.email;
      this.dob = data.dob;
      this.updatedEmail = data.updatedEmail;
    });
  });

  // it("Runs a query", () => {
  //   const query = "SELECT * FROM students";

  //   cy.task("runQuery", query).then((rows) => {
  //     console.log(JSON.stringify(rows, null, 2));
  //     cy.log(JSON.stringify(rows, null, 2));
  //   });
  // });

  /**
   * Test Case 1
   *
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Create a valid user
   * 3. Run a query to validate that the user was created
   */

  it("Test Case 1: Create a valid user and validate", function () {
    backendPage.createUser(this.firstname, this.lastname, this.email, this.dob);

    const query = `SELECT * FROM students WHERE email = '${this.email}'`;

    cy.task("runQuery", query).then((rows) => {
      expect(rows).to.have.length(1);

      // cy.log(JSON.stringify(rows, null, 2));

      const user = rows[0];
      cy.log(JSON.stringify(user, null, 2));

      const expectedUser = [
        this.dob,
        this.email,
        this.firstname,
        this.lastname,
      ];

      expectedUser.forEach((value, index) => {
        expect(user[index + 1]).to.contains(value);
      });
    });
  });

  /**
   * Test Case 2
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Update a valid user
   * 3. Run a query to validate that the user was updated
   */

  it("Test Case 2: Update a valid user and validate in the database", function () {
    backendPage.getUserEditButton(this.firstname);
    backendPage.getModalEmail().clear().type(this.updatedEmail);
    backendPage.getModalUpdateButton().click();

    // Validating the modal is closed
    backendPage.getModal().should("not.exist");

    const query = `SELECT * FROM students WHERE email = '${this.updatedEmail}'`;

    cy.task("runQuery", query).then((rows) => {
      expect(rows).to.have.length(1);

      const user = rows[0];

      const expectedUser = [
        this.dob,
        this.updatedEmail,
        this.firstname,
        this.lastname,
      ];

      expectedUser.forEach((value, index) => {
        expect(user[index + 1]).to.contains(value);
      });
    });
  });

  /**
   * Test Case 3
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Delete the user you created
   * 3. Run a query to validate that the user was deleted
   */
  it("Test Case 3: Delete a valid user and validate in the database", function () {
    backendPage.getUserDeleteButton(this.updatedEmail);

    const query = `SELECT * FROM students WHERE email = '${this.updatedEmail}'`;

    cy.task("runQuery", query).then((rows) => {
      expect(rows).to.have.length(0);
    });
  });
});