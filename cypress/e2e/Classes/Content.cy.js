describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/todo')
    })
  
  

    it('Invoke command', () => {
      //example 1
      cy.get('[for="exampleInputEmail1"').should('contain', 'Email address')

      //example 2
      cy.get('[for="exampleInputEmail1"').then( label => {
        expect(label.text()).to.equal('Email address')
      })

      //example 3
      cy.get('[for="exampleInputEmail1"').invoke('text').then( text => {
        expect(text).to.equal('Email address');
      })

      //example 4
      cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'checked');
        .then( classValue => {
          expect(classValue).to.contains('checked')
        })


      //assert property
      cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contains', 'Dec 17, 2019')
      })
    })

    it('Checkboxes and Radio Buttons', () => {
      //Radio button
      cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioBs => {
        cy.wrap(radioBs)
        .first()
        .check({force: true})//check method
        //hidden element can not use check method without force
        .should('be.checked');
        cy.wrap(radioBs)
        .eq(1)
        .check({force: true})

        cy.wrap(radioBs)
        .first()//get the first element, it i the same like .eq(0)
        .should('not.be.checked')

        cy.wrap(radioBs)
        .eq(2)
        .should('be.disabled')
      })

      //Checkboxes
      cy.get('[type="checkbox"]').check({force: true})//3 elements appear, check the checkbox uncheck. We can not uncheck a checkbox checked
      cy.get('[type="checkbox"]').eq(0).click({force: true})//with click, you can uncheck a checkbox checked
      cy.get('[type="checkbox"]').eq(0).check({force: true})//nothing happen because the checkbox is already checked.

      //check method will work only with input elements and tyoe of the element should be checkbox's or radio buttons
      //but you can not unchecked the checkbox.
      //you can use click method but it is highlt recommend to use the check command with this type of web elements.
    })

    it('Web Datepickers', () => {

      function selectDayFromCurrent(day){
        //get current date
        let date = new Date()
        date.setDate(date.getDate() + day)//return current date and get 2 days more
        let futureDay = date.getDay();
        let futureMonth = date.toLocaleString('default', {month: 'short'})   //getMonth()//return the number of the month
        let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
          if(!dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
          }else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        })
        return dateAssert
      }

      cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(1)
        cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
      })
    })

    it('Lists and Dropdowns', () => {
      //open dropdown
      cy.get('nav nb-select').click()
      cy.get('.options-list').contains('Dark').click()

      //check i the background color change
      //convert the code color to RGB
      cy.get('nav nb-select').should('contains', 'Dark')
      cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

      //Select each of the items in the list and verify in the title of the dropdown, 
      //like loop throught the list of the elements
      cy.get('nav nb-select').then( dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-options').each( (listItem, index) => {
          const itemText = listItem.text().trim()
          //sometimes the text includes a space, so we have the following method to delete the extra spaces: trim()
          const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
          }

          cy.wrap(listItem).click()
          cy.wrap(dropdown).should('contains', itemText)
          cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
          //open he dropdown after each element but not for the last one
          //cy.wrap(dropdown).click() //no abrir el dropdown
          if(index < 3){
            cy.wrap(dropdown).click()
          }
          //.select() option only work if the tag name is select and contains a value 
        })
      })
    })

    it('Web tables', () => {
      //Example 1
      cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        //si una tabla no tiene un elemento claro para buscar un elemento en una fila, usar un index
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
      })

      //Example 2= agregar datos a la tabla y verificar
      cy.get('thead').find('nb-plus').click()
      cy.get('thead').find('tr').eq(2).then( tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name]"').type('Artem')
        cy.wrap(tableRow).find('[placeholder="Last Name]"').type('Bondar')
        cy.wrap(tableRow).find('.nb-checkmark').click()
      })
      cy.get('tbody tr').first().find('td').then( tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Artem')
        cy.wrap(tableColumns).eq(2).should('contain', 'Bondar')
      })

      //Example 3= realizar busqueda por los filtros de la tabla
      cy.get('thead [placeholder="Age"]').type('20')
      //obtener todas las filas de la tabla y verificar que el filtro aplica bien
      cy.wait(500)
      cy.get('tbody tr').each(tableRow => {
        cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
      })

      //create small array
      const age = [20, 30, 40, 200]

      cy.wrap(age).each(age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each(tableRow => {
          if(age == 200){//assert if the filter does not show results, just a message
            cy.wrap(tableRow).should('contain', 'No data found')
          } else {
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
          }
        }) 
      })
    })

    it('Pop Ups and ToolTips', () => {
      //tooltip with click
      //When puta mouse in the element and It shows a message
      cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
      cy.get('nb-tooltip').should('contain', 'This is a tooltip')

      //dialog boxes
      //click on the button and show a message as a part of the browser and not of the application
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?')// nunca falla porque no es algo que podemos controlar
      })

      //how to do it?
      const stub = cy.stub()
      cy.on('window:confirm', stub)
      y.get('tbody tr').first().find('.nb-trash').click().then(() => {
        expect((stub.getCall(0))).to.be.calledWith('Are you sure you want to delete?')//best way
      })

      //Example 3: cancele
      cy.get('tbody tr').first().find('.nb-trash').click()
      cy.on('window:confirm', () => false)
    })

    it('Assertions', () => {
      //See assertion library in Cypress page, chai j and chai assertion
      //example 1
      cy.get('[for="exampleInputEmail1"')
      .should('contain', 'Email address')
      .should('have.class', 'label')//new, label = value
      .and('have.text', 'Email address')

      //example 2
      cy.get('[for="exampleInputEmail1"').then( label => {
        expect(label.text()).to.equal('Email address')
        expect(label).to.have.class('label')//new
        expect(label).to.have.text('Email address')
      })

      //example 3
      cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(1)
        cy.wrap(input).invoke('prop', 'value').should('contains', dateAssert)
        cy.wrap(input).should('have.value', dateAssert)//new
      })
     
    })
  })
  