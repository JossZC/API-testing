describe('Visual testing', () => {

    it('Should test snapshot', () => {
        cy.visit('https://example.cypress.io/todo')

        cy.contains('h1', 'todos').then( form => {
            cy.wrap(form).toMatchImageSnapshot() //despues de ejecutar la prueba agregara la captura en el folder image snapshots
            //Snapshot of the entire page:
            cy.document().toMatchImageSnapshot()
        })
    })
})