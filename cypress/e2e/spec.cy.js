beforeEach(() => {
  cy.viewport(1200, 750)
  cy.visit("https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/")
})
describe('Guest Component pathing Test', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });

  it('Check Login', ()=> {
    cy.visit("https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/login")
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#email').clear('E');
    cy.get('#email').type('Email');
    cy.get('#password').clear('P');
    cy.get('#password').type('Password');
    cy.get('.PrivateSwitchBase-input').check();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Create Account', function() {
    /* ==== Generated with Cypress Studio ==== */
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
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Guest User', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/');
    cy.visit('https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/home_browser')
    cy.get('.css-14j5k7k').click();
    /* ==== End Cypress Studio ==== */
  });
});