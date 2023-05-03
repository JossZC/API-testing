//Summary
/* 1. API= Application Programing Interface
    2. Types of request: GET, POST, PUT and DELETE
    3. Typical request has: URL, Herders, Request Type, Body
    4. Cypress has built in server which can intercept browser API requests and provide mock response.
    5. Cypress can make API requests and process responses.
*/

describe('APIs in Cypress', () => {

    /*beforeEach(() => {
        cy.loginToAppGetToken();
    })*/

    it('JSON objects', () => {
        const simpleObject = {"key": "value"}
        console.log(simpleObject.key)
        console.log(simpleObject["key"])
    
        const simpleArrayOfValues = ["One", "Two", "Three"]
        console.log(simpleArrayOfValues[1])
    
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}]
        console.log(arrayOfObjects[1].key2)
    
        const typeOfData = {"string": "String", "number": 24}
    
        const mix = {
            "firstName": "Artem",
            "lastName": "Bondar",
            "Age": 35,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }
        console.log(mix.Students[0].firstName)
    })

    it('Mock API response', () => {
        //cy.intercept api calls
        //how to intercept API request and provide our own API response that we want for our application so Cypress
    })

    it('CY.INTERCEPT() in details', () => {
        //https://docs.cypress.io/api/commands/intercept#docusaurus_skipToContent_fallback
    })

    it('API Calls Using Cypress', () => {
        //Ejemplos curso
        /*const userCredentials = {
            "user": {
                "email": "artem.bondar16@gmail.com",
                "password": "CypressTest1"
            }
        }
        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Request from API",
                "description": "API testing is easy",
                "body": "Angular is cool"
            }
        }
        cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
        .its('body').then(body => {
            const tken = body.user.token
        })

        cy.request({
            url: '',
            headers: {'Autorization': 'Token '+token},
            method: 'POST',
            body: bodyRequest
        }).then( response => {
            expect(response.status).to.equal(200)
        })
        //verify if the article is deleted successfully (delete process manually)
        cy.request({
            url: 'del articulo',
            headers: {'Autorization': 'Token '+token},
            method: 'GET'
        }).its('body').then( body => {
            expect(body.article[0].title).not.to.equal('Request from API')
        })*/


        // API URL: https://simple-grocery-store-api.glitch.me
        cy.request('GET',Cypress.env("apiURL")+'status').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.be.eq('UP')
        })
    })

    /*it('Headless Authorization', () => {
        // Previus test
        const userCredentials = {
            "user": {
                "email": "artem.bondar16@gmail.com",
                "password": "CypressTest1"
            }
        }
        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Request from API",
                "description": "API testing is easy",
                "body": "Angular is cool"
            }
        }

        cy.get('@token').then(token => [
            cy.request({
                url: '',
                headers: {'Autorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
            }).then( response => {
                expect(response.status).to.equal(200)
            }),
            cy.request({
                url: 'del articulo',
                headers: {'Autorization': 'Token '+token},
                method: 'GET'
            }).its('body').then( body => {
                expect(body.article[0].title).not.to.equal('Request from API')
            })
        ])
    })*/

    it.only('API requests to Grocery Store', () => {
        cy.request('https://simple-grocery-store-api.glitch.me/status').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.be.eq('UP')
        })
        cy.request('https://simple-grocery-store-api.glitch.me/products').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.above(0)
            console.log(response.body[0])
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('inStock')
            expect(response.body[0].inStock).to.be.true
        })
    })
})
