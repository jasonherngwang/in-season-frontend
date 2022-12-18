describe('login and logout functionality', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.request('POST', 'http://localhost:5173/api/testing/createTestUser');
    cy.visit('http://localhost:5173/login');
  });

  it('user can login with correct credentials', () => {
    cy.get('#username').type('initialUser');
    cy.get('#password').type('password');
    cy.get('#loginButton').click();

    cy.get('#menuButton').click();
    cy.get('#menu').should('contain', 'initialUser');
  });

  it('login fails with wrong credentials', () => {
    cy.get('#username').type('initialUser');
    cy.get('#password').type('incorrectPassword');
    cy.get('#loginButton').click();

    cy.get('form').should('contain', 'Incorrect username and/or password.');
  });

  it('user can logout', () => {
    cy.login({ username: 'initialUser', password: 'password' });
    cy.get('#menuButton').click();
    cy.contains('Logout').click();

    cy.get('#menuButton').click();
    cy.get('#menu').should('not.contain', 'Logout').and('contain', 'Login');
  });
});

describe('when not logged in', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset');
    cy.request('POST', 'http://localhost:5173/api/testing/createTrialUser');
    cy.visit('http://localhost:5173');
  });

  it('add food page redirects to login', () => {
    cy.contains('Add Food').click();
    cy.contains('Add Food').should('not.exist');
    cy.contains('Login');
  });

  it('trial user data are loaded', () => {
    cy.contains('Apple');
  });
});

export {};
