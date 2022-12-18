describe('app pages can be opened', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.visit('http://localhost:5173');
  });

  it('home page can be opened', () => {
    cy.contains('Season');
  });

  it('basket can be opened', () => {
    cy.get('#basketIcon').click();
    cy.contains('Basket');
  });

  it('signup page can be opened', () => {
    cy.get('#menuButton').click();
    cy.contains('Sign Up').click();

    cy.contains('Sign Up');
    cy.get('form').should('contain', 'Username').and('contain', 'Username');
  });

  it('login page can be opened', () => {
    cy.get('#menuButton').click();
    cy.contains('Login').click();

    cy.contains('Login');
    cy.get('form').should('contain', 'Username').and('contain', 'Username');
  });
});

export {};
