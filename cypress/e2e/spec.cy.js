describe('Example front end test 1', () => {
  beforeEach(()=> {
    cy.visit("https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/")
  })
  
  it('passes', () => {
    cy.get('#nameinput').should('contain.value', '')

    cy.get('#nameinput').type('Super Cool Name')

    cy.get('#nameinput').should('contain.value', 'Super Cool Name')

    cy.get(".page_main__GlU4n > :nth-child(5)").click()

    cy.get('#nameinput').should('contain.value', '')
  })
})


describe('Example front end test 2', () => {
  beforeEach(()=> {
    cy.visit("https://my-map-styler-frontend-60bea3c51be3.herokuapp.com/")
  })
  
  it('passes', () => {
    cy.get('.page_main__GlU4n > :nth-child(7)').should('contain.text', 'Refresh all names from db')

    cy.get('h2').should('not.contain.text', 'All names: yo')

    cy.get('.page_main__GlU4n > :nth-child(7)').click()

    cy.get('h2').should('contain.text', 'All names: yo')
  })
})