import '@bahmutov/cy-api/support'
import 'cypress-plugin-snapshots/commands'

export const fixCypressSpec = filename => () => {
  const path = require('path')
  const relative = filename.substr(1) // removes leading "/"
  const projectRoot = Cypress.config('projectRoot')
  const absolute = path.join(projectRoot, relative)
  Cypress.spec = {
    absolute,
    name: path.basename(filename),
    relative
  }
}
