describe('basket operations', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.request('POST', 'http://localhost:5173/api/testing/createTestUser');
    cy.login({ username: 'initialUser', password: 'password' });
  });

  it('from home page, user can add food to basket', () => {
    cy.contains('Apple').parent().contains('Add to Basket').click();
    cy.visit('http://localhost:5173/basket');
    cy.contains('Apple');
  });

  it('from home page, user can delete food from basket', () => {
    cy.contains('Apple').parent().contains('Add to Basket').click();
    cy.contains('Apple').parent().contains('Remove').click();
    // Wait for page to load before checking for non-existent elements
    cy.visit('http://localhost:5173/basket').contains('Basket').should('exist');
    cy.contains('Apple').should('not.exist');
  });

  it('from basket, user can delete food', () => {
    cy.contains('Apple').parent().contains('Add to Basket').click();
    cy.visit('http://localhost:5173/basket');

    cy.contains('td', 'Apple').next().next().children('button').click();
    cy.contains('Apple').should('not.exist');
  });

  it('from basket, user can toggle acquired state', () => {
    cy.contains('Apple').parent().contains('Add to Basket').click();
    cy.visit('http://localhost:5173/basket').contains('Basket').should('exist');

    cy.contains('td', 'Apple')
      .next()
      .children('button')
      .get('[data-headlessui-state=checked]')
      .should('not.exist');

    cy.contains('td', 'Apple')
      .next()
      .children('button')
      .click()
      .get('[data-headlessui-state=checked]')
      .should('exist');
  });
});

export {};
