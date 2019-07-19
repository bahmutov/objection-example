// enables intelligent code completion for Cypress commands
// and the additional custom command "cy.api"
// https://on.cypress.io/intelligent-code-completion
/// <reference types="@bahmutov/cy-api" />

describe('Movie ⭐️s', () => {
  it('are people too', () => {
    cy.api(
      {
        url: 'persons',
        method: 'POST',
        body: {
          firstName: 'Sylvester',
          lastName: 'Stallone',
          age: 68
        }
      },
      'Stallone'
    )

    cy.api(
      {
        url: 'persons',
        method: 'POST',
        body: {
          firstName: 'Ben',
          lastName: 'Affleck',
          age: 40
        }
      },
      'Affleck'
    )
      .its('body') // grab the returned object
      .as('ben') // and save that object in the shared test context

    cy.api({
      method: 'POST',
      url: 'persons',
      body: {
        firstName: 'Matt',
        lastName: 'Damon',
        age: 43,

        parent: {
          firstName: 'Kent',
          lastName: 'Damon',
          age: 70
        },

        pets: [
          {
            name: 'Doggo',
            species: 'dog'
          },
          {
            name: 'Kat',
            species: 'cat'
          }
        ],

        movies: [
          {
            name: 'The Martian'
          },
          {
            name: 'Good Will Hunting'
          }
        ]
      }
    })
      .its('body') // we get Matt's object back
      .as('matt') // save object in shared test context
      .then(matt => {
        cy.api(
          {
            method: 'PATCH',
            url: `persons/${matt.parent.id}`,
            body: {
              age: 71
            }
          },
          "Patch dad' age"
        )

        // This updates kent and his relations to match the graph we send. The relations
        // that are not mentioned at all, are left alone.
        //
        // What happens is:
        //    - `Kat` gets deleted since it is not in the sent graph
        //    - `Doggo`'s name gest updated
        //    - `Kitty` gets inserted since it didn't previously exist.
        cy.api(
          {
            method: 'PATCH',
            url: `persons/${matt.id}/upsert`,
            body: {
              id: matt.id,

              pets: [
                {
                  id: matt.pets[0].id,
                  name: 'The dog'
                },
                {
                  name: 'Kitty',
                  species: 'cat'
                }
              ]
            }
          },
          'upsert pets'
        )
      })
      .then(function () {
        // by now we have both "ben" and "matt" objects in the shared test context
        // and we can access the object using "this" since we are using
        // the "function () {}" callback format
        cy.api(
          {
            method: 'POST',
            url: `movies/${this.matt.movies[1].id}/actors`,
            body: {
              id: this.ben.id
            }
          },
          'Ben was with Matt in Good Will Hunting'
        )
      })
      .then(function () {
        cy.api(
          {
            method: 'POST',
            url: `persons/${this.ben.id}/pets`,
            body: {
              name: 'The Hound',
              species: 'dog'
            }
          },
          'The Hound'
        )
      })

    cy.api(
      {
        url: 'persons',
        qs: {
          minAge: 41,
          eager: `[
            parent,
            children,
            pets,

            movies.[
              actors.[
                pets
              ]
            ]
          ]`
        }
      },
      'All people'
    )
      .its('body')
      .then(list => console.dir(list, { depth: null }))
  })
})
