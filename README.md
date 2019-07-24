# objection-example [![renovate-app badge][renovate-badge]][renovate-app] [![CircleCI](https://circleci.com/gh/bahmutov/objection-example/tree/master.svg?style=svg)](https://circleci.com/gh/bahmutov/objection-example/tree/master)
> Simple Object.js ORM example copied from Vincit/objection.js

This example was copied from folder [examples/express-es7](https://github.com/Vincit/objection.js/tree/master/examples/express-es7) of [github.com/Vincit/objection.js](https://github.com/Vincit/objection.js). See [Objection.js docs](https://vincit.github.io/objection.js/)

The original client code that makes HTTP requests is in [client.js](client.js) but for this demo we are going to use [Cypress Test Runner](https://github.com/cypress-io/cypress) with [@bahmutov/cy-api](https://github.com/bahmutov/cy-api) plugin.

![Tests](images/people.png)

## Install

```shell
npm ci
```

## Run

To start local server and open Cypress

```shell
npm run dev
```

## Tests

There are several specs in [cypress/integration](cypress/integration) folder

- [movies-spec.js](cypress/integration/movies-spec.js) shows how to add a new movie, and how the API checks for required fields to be present
- [spec.js](cypress/integration/spec.js) shows complex calls to insert multiple entities in a single call, updating multiple objects using "upsert"

## More info

- Read ["Black box API testing with server logs"](https://glebbahmutov.com/blog/api-testing-with-sever-logs/) post.
- see another example [server-logs-example](https://github.com/bahmutov/server-logs-example)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2019

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

Original License: See [github.com/Vincit/objection.js](https://github.com/Vincit/objection.js)
Additions showing logs and Cypress tests under MIT License - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/objection-example/issues) on Github
