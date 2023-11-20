
describe('Guest Component pathing Test', () => {

  beforeEach(() => {
    cy.viewport(1200, 750)
    cy.visit("http://localhost:3000")
  })

  it('passes', () => {

    cy.contains("Let's get started")

    cy.contains("Login").click()

    cy.contains("Sign in")

    cy.contains("Don't have an account? Sign Up").click()

    cy.contains("Sign up to start exploring and creating amazing maps!")

    cy.contains("Login Here").click()

    cy.contains("Sign in")

    cy.contains("Back to Start Screen").click()

    cy.contains("Let's get started")

    cy.contains("Continue As Guest").click()

    cy.contains("My Map Styler")

  })
})


/*
describe('Login Account Test', () => {
  beforeEach(()=> {
    cy.visit("http://localhost:3000/")
  })
  
  it('passes', () => {
    
    cy.contains("Let's get started")

    cy.contains("Login").click()

    cy.get("#email").type("example@email.com")

    cy.get("#password").type("examplePassword123")

    cy.contains("Sign in").click()

    cy.contains("My Map Styler")
    cy.contains("Filter")

    cy.get('.css-1n5dzhm > .MuiButtonBase-root').click()

    cy.get('[href="/profile"]').click()

    cy.contains("First Name: Jane")

  })
})

*/