// enables intelligent code completion for Cypress commands
// and the additional custom command "cy.api"
// https://on.cypress.io/intelligent-code-completion
/// <reference types="@bahmutov/cy-api" />

describe('Movie ⭐️s', () => {
  it('are people too', () => {
    cy.api({
      url: 'persons',
      method: 'POST',
      body: {
        firstName: 'Sylvester',
        lastName: 'Stallone',
        age: 68
      }
    })
  })
})
