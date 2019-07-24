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

it('finds movie', () => {
  cy.api({
    method: 'POST',
    url: '/movies',
    body: {
      name: 'Mean Girls'
    }
  }).then(({ body }) => {
    expect(body.id, 'movie id').to.equal(1)
  })

  cy.api({
    url: '/movies/1'
  })
})

it('sends 404 if movie is not found', () => {
  cy.api({
    url: '/movies/20',
    failOnStatusCode: false
  }).should('have.property', 'status', 404)
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
  }).should('have.property', 'status', 400)
})
