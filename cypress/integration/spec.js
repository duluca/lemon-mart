/// <reference types="cypress" />
it('works', () => {
  cy.visit('/')
  cy.get('[aria-label="E-mail"]').type('cashier@test.com')
  cy.get('[aria-label="Password"]').type('12345678')
  cy.contains('Login').click()
})
