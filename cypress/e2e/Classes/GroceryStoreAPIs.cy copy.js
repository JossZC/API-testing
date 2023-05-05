
describe('Grocery Store', () => {

    //Variables in the cypress.env.json
    let user = "Juan Perez", email = "jp@qwe.com", apiURL = "https://simple-grocery-store-api.glitch.me/"

    //variables
    let productID, cardID, itemID, orderID;
    let token = "dfbac8acdab857a026d775a498f9134e6b4baa2086f4c7b056bee3d7eeb46002"

    it('Check status', () => {
        cy.request(apiURL+'status').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.be.eq('UP')
        })
    })

    it('Get all products', () => {
        cy.request(apiURL+'products').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.above(0)
            console.log(response.body[0])
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('inStock')
            expect(response.body[0].inStock).to.be.true
            productID = response.body[0].id;
        })
    })

    it('Get single product', () => {
        cy.request(apiURL+'products/'+productID).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.price).to.not.be.null
            expect(response.body.price).to.be.a('number')
            //expect(response.body.price).to.have.length.of.at.most(0)
        })
    })

    it('Create a new cart', () => {
        cy.request({
            url: apiURL+carts,
            method: 'POST'
        }).then( response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body).to.haveOwnProperty('cartId')
            expect(response.body.cartId).to.be.an('string')
            cardID = response.body.cartId
        })
    })

    it('Get a cart', () => {
        cy.request(apiURL+'carts/'+cardID).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
        })
    })

    it('Get cart items', () => {
        cy.request(apiURL+'carts/'+cardID+'/items').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Add item to cart', () => { 
        cy.request('POST',apiURL+'carts/'+cardID+'/items', { "productId": productID}).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object');
            expect(response.body.created).to.be.true;
            expect(response.body.itemId).to.be.an('number');
            itemID = response.body.itemId
        })
    })
    //Create API Cliente
    it.skip('Register API Client', () => { 
        cy.request({
            url: apiURL+"api-clients",
            method: 'POST',
            body: {
                "clientName": Cypress.env("username"),
                "clientEmail": Cypress.env("clientEmail")
            }
        }).then( response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body.accessToken).to.be.an('string')
            cy.log(response.body.accessToken)
            token = response.body.accessToken
        })
    })

    it('Create an order', () => { 
        cy.request({
            url: apiURL+"orders",
            headers: {'Authorization': 'Bearer '+token},
            method: 'POST',
            body: {
                "cartId": cardID,
                "customerName": Cypress.env("username")
            }
        }).then( response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body.created).to.be.true
            expect(response.body.orderId).to.be.an('string')
            cy.log(response.body.orderId)
            orderID = response.body.orderId
        })
    })

    it.skip('Delete item in cart', () => { 
        cy.request({
            url: `${apiURL}carts/${cardID}/items/${itemID}`,
            method: 'DELETE'
        }).then( response => {
            expect(response.status).to.eq(204)
        })
    })

    it('Delete order', () => { 
        cy.request({
            url: `${apiURL}orders/${orderID}`,
            headers: {'Authorization': 'Bearer '+token},
            method: 'DELETE'
        }).then( response => {
            expect(response.status).to.eq(204)
        })
    })
})