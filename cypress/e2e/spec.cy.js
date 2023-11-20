

describe('Guest Component pathing Test', () => {

  beforeEach(()=> {
    cy.viewport(1200, 750)
    cy.visit("http://localhost:3000/")
  })
  
  it('passes', () => {

    cy.contains("Let's get Started")

    cy.contains("Login").click()

    cy.contains("Sign in")

    cy.contains("Don't have an account? Sign Up").click()

    cy.contains("Sign up to start exploring and creating amazing maps!")

    cy.contains("Login Here").click()

    cy.contains("Sign in")

    cy.contains("Back to Start Screen").click()

    cy.contains("Let's get Started")

    cy.contains("Continue As Guest").click()

    cy.contains("My Map Styler")
    cy.contains("Filter")

  })
})

/*
describe('Create Account Test', () => {
  beforeEach(()=> {
    cy.visit("http://localhost:3000/")
  })
  
  it('passes', () => {
    cy.contains("My Map Styler")

    cy.contains("Create An Account").click()

    cy.contains("Sign up to start exploring and creating amazing maps!")
  })
})


describe('Continue As Guest Test', () => {
  beforeEach(()=> {
    cy.visit("http://localhost:3000/")
  })
  
  it('passes', () => {
    cy.contains("My Map Styler")

    cy.contains("Login").click()
  })
})
*/