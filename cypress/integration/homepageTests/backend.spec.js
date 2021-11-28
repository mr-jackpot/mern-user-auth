/// <reference types="cypress" />

const env = require("../../../src/server/props");


describe("tests authenication", () => {

    it("is a simple get request", () => {
      cy.request('http://localhost:4000/authtest')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).contains('Failed Login');
      })
    });

    it("tests authentication fails", () => {
      cy.request({
        method: 'POST', 
        url: `${env.SERVER_URL}${env.SERVER_PORT}/auth`,
        failOnStatusCode: false,
        auth:{'username': 'wrong', 'password': 'login'},
        })
      .then((res) => {
        expect(res.status).to.eq(400);
      })
    });

    it("tests authentication successful", () => {
        cy.request('POST', `${env.SERVER_URL}${env.SERVER_PORT}/auth`, {'username': 'admin1', 'password': 'admin1'})
        .then((res) => {
          expect(res.status).to.eq(200);

        })
      });
})

