class BackendPage {
  /* Locators */
  getFirstname() {
    return cy.get('[name="FIRST_NAME"]');
  }

  getLastname() {
    return cy.get('[name="LAST_NAME"]');
  }

  getEmail() {
    return cy.get('[name="EMAIL"]');
  }

  getDOB() {
    return cy.get('[name="DOB"]');
  }

  getAddButton() {
    return cy.get('[type="submit"]')
  }

  getUserList() {
    return cy.get('section:last-child > div')
  }

  getModal() {
    return cy.get('#mymodal');
  }

  getModalEmail() {
    return this.getModal().find('[name="EMAIL"]');
  }

  getModalUpdateButton() {
    return this.getModal().find('[type="submit"]');
  }


  /* Method */
  createUser(firstName, lastName, email, dob) {
    this.getFirstname().type(firstName);
    this.getLastname().type(lastName);
    this.getEmail().type(email);
    this.getDOB().type(dob);
    this.getAddButton().click();
  }

  getUserEditButton(user) {
    return this.getUserList()
    .contains('.common_list__UR80V', user)
    .find('svg').first()
    .click()
  }

    getUserDeleteButton(user) {
    return this.getUserList()
    .contains('.common_list__UR80V', user)
    .find('svg').last()
    .click()
  }
}

module.exports = BackendPage;