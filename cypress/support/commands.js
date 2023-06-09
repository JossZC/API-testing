// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Headless authentication
Cypress.Commands.add('loginToAppGetToken', () => {

    /*const userCredentials = {
        "user": {
            "email": "artem.bondar16@gmail.com",
            "password": "CypressTest1"
        }
    }*/
    //declaradas como variables globales en cypress.config.js
    const userCredentials = {
        "user": {
            "email": Cypress.env("username"),
            "password": Cypress.env("password")
        }
    }
                        //can use env to get the baseURL
    cy.request('POST', Cypress.env("")+'/api/users/login', userCredentials)
    .its('body').then(body => {
        const token = body.user.token
        cy.wrap(token).as('token')
        cy.visit('/', {
            onBeoreLoad (win){
                win.localStorage.setItem('jwtToken', token)
            }
        })
    })
})