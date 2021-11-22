/// <reference types="cypress" />
const env = require('../../../src/server/props')

describe("tests authenication", () => {

    it("tests authentication fails"), () => {
      cy.request('POST', `${env.SERVER_URL}${env.SERVER_PORT}/auth`, {'username': 'wrong', 'password': 'login'})
      .then((response) => {
        expect(response.body).to.have.property('code', 401);
      })
    }

    it("tests authentication successful"), () => {
        cy.request('POST', `${env.SERVER_URL}${env.SERVER_PORT}/auth`, {'username': 'Admin1', 'password': 'Admin1'})
        .then((response) => {
          expect(response.body).to.have.property('code', 200);
        })
      }
})

