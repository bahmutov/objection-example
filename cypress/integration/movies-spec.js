/// <reference types="@bahmutov/cy-api" />

beforeEach(() => {
  // we need to remove any old data from the database
  cy.task('resetDb')
})

const normalizeTimestamp = message => {
  Cypress._.set(message, 'timestamp', '2019-07-24T02:00:16.211Z')
  return message
}

it('inserts movie', () => {
  cy.api({
    method: 'POST',
    url: '/movies',
    body: {
      name: 'Mean Girls'
    }
  })
    .its('body')
    .toMatchSnapshot()
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

it('searches movies given an id', () => {
  cy.api({
    url: '/movies/20',
    failOnStatusCode: false
  })
    .then(({ messages }) =>
      Cypress._.find(messages, {
        type: 'util.debuglog',
        namespace: 'VERBOSE'
      })
    )
    // put the same timestamp into the snapshot
    .then(normalizeTimestamp)
    .toMatchSnapshot()
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

it('does not insert movie without a name - snapshot', () => {
  cy.api({
    method: 'POST',
    url: '/movies',
    body: {
      // oops, did you mean "name"?
      title: 'Mean Girls'
    },
    failOnStatusCode: false
  }).then(({ status, body }) => {
    expect(status).to.equal(400)
    cy.wrap(body).toMatchSnapshot()
  })
})
