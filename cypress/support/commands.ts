/// <reference types="cypress" />
Cypress.Commands.add('login', ({ username, password }) => {
  cy.visit('http://localhost:5173');
  cy.request('POST', 'http://localhost:5173/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
    cy.visit('http://localhost:5173');
  });
});

Cypress.Commands.add('createTestUser', () => {
  cy.request('POST', 'http://localhost:5173/api/testing/createTestUser').then(
    () => {
      cy.visit('http://localhost:5173');
    }
  );
});

export {};
