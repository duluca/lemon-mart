import '../support/commands'

describe('LemonMart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the correct title', () => {
    cy.byTestId('title').should('have.text', 'LemonMart')
  })

  it('can login as cashier', () => {
    cy.get('[aria-label="E-mail"]').type('cashier@test.com')
    cy.get('[aria-label="Password"]').type('12345678')
    cy.contains('Login').click()
  })
})
