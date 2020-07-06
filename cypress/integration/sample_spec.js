describe('My First Test', () => {
  it('click Random', () => {
    cy.visit('http://localhost:5000/')
    cy.get('#bigRedButton').click()
    cy.url().should('include', '#sex=')
    cy.url().should('include', '&skinColor=')
  })
})
