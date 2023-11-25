beforeEach(() => {
  cy.viewport(1200, 750)
  cy.visit("http://localhost:3000/")
})

describe('Guest Component pathing Test', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });

  it('Guest User', function() {
    cy.contains('CONTINUE AS GUEST', {matchCase: false}).click();

    cy.location('href').should('include', '/home_browser')
  });

  it('Log In', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').clear('E');
    cy.get('#email').type('exampleUser@gmail.com');
    cy.get('#password').clear('P');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();

    cy.location('href').should('include', '/home_browser')
  });


  it('Fail Login empty user', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').clear('E');
    cy.get('#password').clear('P');
    cy.get('#password').type('exampleUser');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.")
  });

  it('Fail Login empty password', function() {
    cy.contains('Login', {matchCase: false}).click();

    cy.get('#email').clear('E');
    cy.get('#email').type('exampleUser');
    cy.get('#password').clear('P');
    cy.get('#signIn').click();
    cy.contains("Error: Please enter all required fields.")
  });

  /*
  it('Check Login', ()=> {
   
    cy.get
    cy.get('#email').clear('E');
    cy.get('#email').type('Email');
    cy.get('#password').clear('P');
    cy.get('#password').type('Password');
    cy.get('.PrivateSwitchBase-input').check();

  })


  it('Create Account', function() {
    cy.visit('https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/createAccount');
    cy.get('#firstName').clear();
    cy.get('#firstName').type('First Name');
    cy.get(':nth-child(2) > .MuiFormControl-root').click();
    cy.get('#lastName').clear();
    cy.get('#lastName').type('Last Name');
    cy.get('#userName').clear('U');
    cy.get('#userName').type('User Name');
    cy.get('#email').clear('E');
    cy.get('#email').type('Email');
    cy.get('#password').clear('P');
    cy.get('#password').type('Password');
    cy.get('#confirmPassword').clear('P');
    cy.get('#confirmPassword').type('Password');
  });

  it('Guest User', function() {
    cy.get('.css-14j5k7k').click();
  });
  */
});