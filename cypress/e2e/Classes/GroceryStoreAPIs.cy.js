
describe('Grocery Store', () => {
    let productID = 4643
    let cardID = "tzt2DGNiP8I7NTttu2SMf"
    let itemID = 755732223

    it('Check status', () => {
        cy.request(Cypress.env("apiURL")+'status').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.status).to.be.eq('UP')
        })
    })

    it('Get all products', () => {
        cy.request(Cypress.env("apiURL")+'products').then((response) => {
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
        cy.request(Cypress.env("apiURL")+'products/'+productID).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.price).to.not.be.null
            expect(response.body.price).to.be.a('number')
            //expect(response.body.price).to.have.length.of.at.most(0)
        })
    })

    it.skip('Create a new cart', () => {
        cy.request({
            url: `${Cypress.env("apiURL")}carts`,
            method: 'POST'
        }).then( response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body).to.haveOwnProperty('cartId')
            expect(response.body.cartId).to.be.an('string')
            cardID = response.body.cartId
        })
    })

    it('Get a cart', () => { //https://simple-grocery-store-api.glitch.me//carts/vu9mOeeppz4Bms3MVVOnu
        cy.request(Cypress.env("apiURL")+'carts/'+cardID).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
        })
    })

    it('Get cart items', () => { //https://simple-grocery-store-api.glitch.me//carts/vu9mOeeppz4Bms3MVVOnu = cy.request(Cypress.env("apiURL")+'carts/'+cardID+'/items')
        cy.request(Cypress.env("apiURL")+'carts/'+cardID+'/items').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Add item to cart', () => { 
        cy.request('POST',Cypress.env("apiURL")+'carts/'+cardID+'/items', { "productId": productID}).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object');
            expect(response.body.created).to.be.true;
            expect(response.body.itemId).to.be.an('number');
            itemID = response.body.itemId
        })
    })

    it('Delete item in cart', () => { 
        cy.request({
            url: `${Cypress.env("apiURL")}carts/${cardID}/items/${itemID}`,
            method: 'DELETE'
        }).then( response => {
            expect(response.status).to.eq(204)
        })
    })
})