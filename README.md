# mern-user-auth

Objectives
 - [x] Multiple logins with different privileges (access groups)
	- [x] Configure sessions
	- [x] Decide on either Auth0 or Passport 
	- [x] Different privileges on each account
- [x] Basic unit testing w/ Cypress
	- [x] Cypress tests included in CI/CD Pipeline
- [ ] GCP deployment?
    - Some kind of automation?
    - App engine managed service

This application allows users to authenticate with username and password. The user's session is then stored on a MongoDB backend database to authenticate authorized routes. Basic react front end included. 

It uses Cypress and GitHub Actions to run some API E2E tests.
