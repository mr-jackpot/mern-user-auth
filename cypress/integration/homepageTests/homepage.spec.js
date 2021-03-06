/// <reference types="cypress" />
const env = require("../../../src/server/props");


describe('MERN-USER-AUTH HomePage', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit(`${env.REACT_URL}${env.REACT_PORT}`)
    })

    it('has an input box for username', () => {
        cy.get('input[name="username"]')
        .should('be.visible')
    })

    it('has no failure message'), () => {
        cy.get('FailureResponse')
        .should('not.be.visible')
    }
});
