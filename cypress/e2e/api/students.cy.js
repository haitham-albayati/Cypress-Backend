import { postRequestBody, putRequestBody } from "../../fixtures/testData.json";

describe("CRUD Operations", () => {
  let studentID;
  it("Create a new student using POST", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postRequestBody,
    }).then((response) => {
      // console.log(JSON.stringify(response.body, null, 2))

      expect(response.status).to.equal(201);
      expect(response.body.FIRST_NAME).to.equal(postRequestBody.FIRST_NAME);

      expect(response.duration).to.be.below(1500);

      cy.log(response.body["FIRST_NAME"] + "   " + response.body.FIRST_NAME);

      /**
       * {
       *   "DOB": "1990-01-01",
       *   "EMAIL": "techglobal@gmail.com"
       * }
       *
       * [
       *   ['DOB', '1990-01-01'],
       *   ['EMAIL', 'techglobal@gmail.com']
       * ]
       */

      Object.entries(postRequestBody).forEach(([key, value]) => {
        // cy.log(key)
        // cy.log(value)

        expect(response.body[key]).to.equal(value);
      });

      studentID = response.body.STUDENT_ID;
    });
  });

  /**
   * Get the user you created
   * And validate your status is 200
   */
  it("Read the created user using GET", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  /**
   * Create a PUT request
   * Update the student that we created
   * and validate the status code is 201
   * and validate your updated request is matching with the response of your PUT request
   */
  it("Update the created student using PUT", () => {
    cy.request({
      method: "PUT",
      url: `${Cypress.env("baseUrl")}/${studentID}`,
      body: putRequestBody,
    }).then((response) => {
      cy.log(response.body);

      expect(response.body.message).to.eq(
        `Successfully updated the student with the STUDENT_ID: ${studentID}`
      );
    });
  });

  it("Get the updated student using GET", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body.FIRST_NAME).to.eq(putRequestBody.FIRST_NAME);
    });
  });

  it("Delete the student we created using DELETE", () => {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("baseUrl")}/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});