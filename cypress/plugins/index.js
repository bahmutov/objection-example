// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { Model } = require('objection')
const knexConfig = require('../../knexfile')
const Knex = require('knex')

const knex = Knex(knexConfig.development)
Model.knex(knex)

const Person = require('../../build/models/Person').default
const Movie = require('../../build/models/Movie').default
const Animal = require('../../build/models/Animal').default

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    resetDb () {
      console.log('resetting database')
      return Promise.all([
        Person.query().truncate(),
        Movie.query().truncate(),
        Animal.query().truncate()
      ])
    }
  })
}
