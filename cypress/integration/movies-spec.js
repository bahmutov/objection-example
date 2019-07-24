/// <reference types="@bahmutov/cy-api" />

beforeEach(() => {
  // we need to remove any old data from the database
  cy.task('resetDb')
})

it('inserts movie', () => {
  cy.api({
    method: 'POST',
    url: '/movies',
    body: {
      name: 'Mean Girls'
    }
  })
})

it('does not insert movie without a name', () => {
  cy.api({
    method: 'POST',
    url: '/movies',
    body: {
      // oops, did you mean "name"?
      title: 'Mean Girls'
    },
    failOnStatusCode: false
  })
})
