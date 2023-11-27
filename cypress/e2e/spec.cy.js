
describe('User Tests', () => {

  beforeEach(() => {
    cy.viewport(1200, 750)
    cy.visit("http://localhost:3000/")
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });

  it('Guest User Success', function() {
    cy.contains('CONTINUE AS GUEST', {matchCase: false}).click();

    cy.location('href').should('include', '/home_browser')
  });

  it('Log In Success', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();

    cy.location('href').should('include', '/home_browser')
  });

  it('Register', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('Clone' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.location('href').should('include', '/home_browser')

  });

  it('Fail Login empty both', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.")
  });

  it('Fail Login empty user', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.")
  });

  it('Fail Login empty password', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.")
  });

  it('Fail Login wrong username', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.")
  });

  it('Fail Login wrong password', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.")
  });

  it('Fail Login wrong both', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.")
  });

  it('Fail Login then Log in', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').type('exampleUser854734t65274723');
    cy.get('#password').type('exampleUser854734t65274723');
    cy.get('#signIn').click();
    cy.contains("Error: Wrong email or password provided.")

    cy.contains('Close', {matchCase: false}).click()

    cy.get('#email').clear('E');
    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').clear('P');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();

    cy.location('href').should('include', '/home_browser')
  });

  
  it('Fail Register blank name', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('Clone' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter all required fields.")

  });

  it('Fail Register blank userName', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter all required fields.")

  });

  it('Fail Register blank password', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('Clone' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter all required fields.")

  });



  it('Fail Register duplicate username', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing');
    cy.get('#email').type('clone.cloneson' + ran + '@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: An account with this user name already exists.")
  });

  it('Fail Register duplicate email', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').type('clone.cloneson@stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: An account with this email address already exists.")
  });

  it('Fail Register invalid email', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '#stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter a valid email.")
  });

  it('Fail Register invalid password', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '#stonybrook.edu');
    cy.get('#password').type('secret');
    cy.get('#confirmPassword').type('secret');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter a password of at least 8 characters.")
  });

  it('Fail Register invalid confirmPassword', function() {
    let ran = Math.random()

    cy.contains('Create An Account', {matchCase: false}).click();

    cy.get('#firstName').type('Clone');
    cy.get('#lastName').type('Cloneson');
    cy.get('#userName').type('CloneKing' + ran);
    cy.get('#email').type('clone.cloneson' + ran + '#stonybrook.edu');
    cy.get('#password').type('supersecretpassword');
    cy.get('#confirmPassword').type('supersecretpassword2');

    cy.contains('Confirm Registration', {matchCase: false}).click();

    cy.contains("Error: Please enter the same password twice.")
  });

});


describe('Module Tests', () => {

  beforeEach(() => {
    cy.viewport(1200, 750)
    cy.visit("http://localhost:3000/")

    cy.contains('Login', {matchCase: false}).click();
    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.location('href').should('include', '/home_browser')
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });

  /*
    After implementing guest functionality, have a bunch of guest tests here
  */

  it('Logged Profile', function() {

    cy.get('#profileButton').click();

    cy.contains('View Profile', {matchCase: false}).click();

    cy.location('href').should('include', '/profile')
  });

  /*

  it('Logged Specific Map', function() { // TEMPORARY IMPLEMENTATION

    cy.contains('Map Card Name', {matchCase: false}).click();

    cy.location('href').should('include', '/specificMap')
  });

  */

  it('Logged Map Editing', function() { // TEMPORARY IMPLEMENTATION

    cy.contains('Fork', {matchCase: false}).click();

    cy.location('href').should('include', '/mapEditing')
  });

});
