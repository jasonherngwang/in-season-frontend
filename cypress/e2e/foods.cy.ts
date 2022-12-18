describe('when logged in', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.request('POST', 'http://localhost:5173/api/testing/createTestUser');
    cy.login({ username: 'initialUser', password: 'password' });
  });

  it('add food page can be opened', () => {
    cy.contains('Add Food').click();
    cy.contains('Add Food');
  });

  it('user can add food', () => {
    cy.visit('http://localhost:5173/foods/add');
    cy.get('#name').type('Mystery Food');
    cy.get('#category').select('other');
    cy.get('#Dec').check();
    cy.contains('Add Food');
    cy.contains('Save').click();
    cy.contains('Details successfully updated.');

    cy.contains('Go Back').click();
    cy.contains('Mystery Food');
  });

  it('user can navigate to edit food page', () => {
    cy.contains('Apple').parent().click();
    cy.contains('Edit Food');
    cy.get('#name').should('have.value', 'Apple');
  });
});

describe('filtering operations', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.request('POST', 'http://localhost:5173/api/testing/createTrialUser');
    cy.visit('http://localhost:5173');
  });

  it('search box works', () => {
    cy.get('#filterTerm').type('Mango');
    cy.contains('Apple').should('not.exist');
    cy.contains('Mango').should('exist');
    cy.contains('Mangosteen').should('exist');
  });

  it('filter checkbox works', () => {
    cy.contains('Apple').should('exist');
    cy.get('#checkFruit').uncheck();
    cy.contains('Apple').should('not.exist');
  });
});

export {};
