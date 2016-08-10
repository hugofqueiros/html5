# redux react dashboard 

Redux and React - Isomorphic/Universal app

## Pre-requisits
- `npm v3`
-  Make sure mongoDB is running. Instalation guide -> [MongoDB install guide](https://docs.mongodb.org/v3.0/installation/)

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

## Tests

```sh
npm install
npm test
```

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled
2. `npm run bs` - bundles the code and starts the production server
3. `npm run test` - start the test runner
4. `npm run watch:test` - start the test runner with watch mode
5. `npm run cover` - generates test coverage report
6. `npm run lint` - runs linter to check for lint errors
7. `npm check:updates` - check if there are any dependencies updates

## File Structure

### Webpack Configs

Redux React Dashboard uses Webpack for bundling modules. There are four types 
of Webpack configs provided:
- `webpack.config.dev.js` - for development
- `webpack.config.prod.js` - for production
- `webpack.config.server.js` - for bundling server in production
- `webpack.config.babel.js` - for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders), for server rendering of assets included through webpack.

### Server

Redux React Dashboard uses express web framework.
The app sits in `server.js` where I check for NODE_ENV.
If NODE_ENV is development, Webpack middlewares is applied for bundling and Hot Module Replacement.

#### Server Side Rendering

Uses React Router's match function for handling all page requests so that borwser history works.
All the routes are defined in `client/routes.js`. React Router renders components according to route requested.


`match` takes two parameters, first is an object that contains routes, location and history and second is a callback function which is called when routes have been matched to a location.

If there's an error in matching we return 500 status code, if no matches are found we return 404 status code. If a match is found then, we need to create a new Redux Store instance.

**Note:** A new Redux Store has populated afresh on every request.

`fetchComponentData` is the essential function. It takes three params: first is a dispatch function of Redux store, the second is an array of components that should be rendered in current route and third is the route params. `fetchComponentData` collects all the needs (need is an array of actions that are required to be dispatched before rendering the component) of components in the current route. It returns a promise when all the required actions are dispatched. We render the page and send data to the client for client-side rendering in `window.__INITIAL_STATE__`.

### Client
Client directory contains all the shared components, routes, modules.

#### components
This folder contains all the common components which are used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following
```
| - Post
  | - __tests__ // all the tests for this module goes here
      | - components // Sub components of this module
          | - Post.spec.js
          | - PostList.spec.js
          | - PostItem.spec.js
          | - PostImage.spec.js
      | - pages
          | - PostPage.spec.js
          | - PostViewPage.spec.js
      | - PostReducer.spec.js
      | - PostActions.spec.js
  | - components // Sub components of this module
      | - Post.js
      | - PostList.js
      | - PostItem.js
      | - PostImage.js
  | - pages // React Router Pages from this module
      | - PostPage
          | - PostPage.js
          | - PostPage.css
      | - PostViewPage
          | - PostViewPage.js
          | - PostViewPage.css
  | - PostReducer.js
  | - PostActions.js
```

## Misc

### importing Assets
Assets can be kept where you want and can be imported into your js files or css files. Those fill be served by webpack in development mode and copied to the dist folder during production.

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.

### Docker
There are docker configurations for both development and production.

- you might need to run `docker-machine start default`.
- `eval "$(docker-machine env default)"`

To run docker for development,
```
docker-compose -f docker-compose-development.yml build
docker-compose -f docker-compose-development.yml up
```

To run docker for production,
```
docker-compose build
docker-compose up
```

## Dependencies

- [babel-core](https://github.com/babel/babel/tree/master/packages): Babel compiler core.
- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [compression](https://github.com/expressjs/compression): Node.js compression middleware
- [cross-env](https://github.com/kentcdodds/cross-env): Run commands that set environment variables across platforms
- [cuid](https://github.com/ericelliott/cuid): Collision-resistant ids optimized for horizontal scaling and performance. For node and browsers.
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [intl](https://github.com/andyearnshaw/Intl.js): Polyfill the ECMA-402 Intl API (except collation)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch): Isomorphic WHATWG Fetch API, for Node &amp; Browserify
- [limax](https://github.com/lovell/limax): Node.js module to generate URL slugs. Another one? This one cares about i18n and transliterates non-Latin scripts to conform to the RFC3986 standard. Mostly API-compatible with similar modules.
- [mongoose](https://github.com/Automattic/mongoose): Mongoose MongoDB ODM
- [react](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.
- [react-dom](https://github.com/facebook/react): React package for working with the DOM.
- [react-helmet](https://github.com/nfl/react-helmet): A document head manager for React
- [react-intl](https://github.com/yahoo/react-intl): Internationalize React apps. This library provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.
- [react-redux](https://github.com/reactjs/react-redux): Official React bindings for Redux
- [react-router](https://github.com/reactjs/react-router): A complete routing library for React
- [redux](https://github.com/reactjs/redux): Predictable state container for JavaScript apps
- [redux-thunk](https://github.com/gaearon/redux-thunk): Thunk middleware for Redux.
- [sanitize-html](https://github.com/punkave/sanitize-html): Clean up user-submitted HTML, preserving whitelisted elements and whitelisted attributes on a per-element basis

## Dev Dependencies

- [ava](https://github.com/avajs/ava): Futuristic test runner 🚀
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-loader](https://github.com/babel/babel-loader): babel module loader for webpack
- [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders): babel 6 plugin which allows to use webpack loaders
- [babel-polyfill](https://github.com/babel/babel/tree/master/packages): Provides polyfills necessary for a full ES2015+ environment
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages): Babel preset for all es2015 plugins.
- [babel-preset-es2015-native-modules](https://github.com/araphel/babel-preset-es2015-native-modules): Babel preset for all es2015 plugins but one, babel-plugin-transform-es2015-modules-commonjs
- [babel-preset-react](https://github.com/babel/babel/tree/master/packages): Babel preset for all React plugins.
- [babel-preset-react-optimize](https://github.com/thejamekyle/babel-preset-react-optimize/tree/master/packages): 
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages): Babel preset for stage 0 plugins
- [babel-register](https://github.com/babel/babel/tree/master/packages): babel require hook
- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [chunk-manifest-webpack-plugin](https://github.com/diurnalist/chunk-manifest-webpack-plugin): Allows exporting a manifest that maps chunk ids to their output files, instead of keeping the mapping inside the webpack bootstrap.
- [coveralls](https://github.com/nickmerwin/node-coveralls): takes json-cov output into stdin and POSTs to coveralls.io
- [css-loader](https://github.com/webpack/css-loader): css loader module for webpack
- [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook): A require hook to compile CSS Modules on the fly
- [cssnano](https://github.com/ben-eb/cssnano): A modular minifier, built on top of the PostCSS ecosystem.
- [enzyme](https://github.com/airbnb/enzyme): JavaScript Testing utilities for React
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-airbnb](https://github.com/airbnb/javascript): Airbnb&#39;s ESLint config, following our styleguide
- [eslint-plugin-ava](https://github.com/avajs/eslint-plugin-ava): ESLint rules for AVA
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import): Import with sanity.
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y): A static analysis linter of jsx and their accessibility with screen readers.
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React specific linting rules for ESLint
- [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin): Extract text from bundle into a file.
- [file-loader](https://github.com/webpack/file-loader): file loader module for webpack
- [jsdom](https://github.com/tmpvar/jsdom): A JavaScript implementation of the DOM and HTML standards
- [json-loader](https://github.com/webpack/json-loader): json loader module for webpack
- [mock-css-modules](https://github.com/bmatcuk/mock-css-modules): Mock CSS Modules for testing.
- [mockgoose](https://github.com/mockgoose/Mockgoose): Mockgoose is an in memory database mock to allow for testing of applications that rely on Mongoose.
- [nock](https://github.com/node-nock/nock): HTTP Server mocking for Node.js
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [npm-check-updates](https://github.com/tjunnone/npm-check-updates): Find newer versions of dependencies than what your package.json or bower.json allows
- [null-loader](https://github.com/webpack/null-loader): A loader that returns an empty module.
- [nyc](https://github.com/bcoe/nyc): the Istanbul command line interface
- [postcss-cssnext](https://github.com/MoOx/postcss-cssnext): Use tomorrow’s CSS syntax, today
- [postcss-focus](https://github.com/postcss/postcss-focus): PostCSS plugin to add :focus selector to every :hover
- [postcss-loader](https://github.com/postcss/postcss-loader): PostCSS loader for webpack
- [postcss-reporter](https://github.com/postcss/postcss-reporter): Log PostCSS messages in the console
- [pre-commit](https://github.com/observing/pre-commit): Automatically install pre-commit hooks for your npm modules.
- [react-addons-test-utils](https://github.com/facebook/react): This package provides the React TestUtils add-on.
- [react-hot-loader](https://github.com/gaearon/react-hot-loader): Tweak React components in real time.
- [redux-ava](https://github.com/sotojuan/redux-ava): Write AVA tests for redux pretty quickly
- [redux-devtools](https://github.com/gaearon/redux-devtools): Redux DevTools with hot reloading and time travel
- [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor): A resizable and movable dock for Redux DevTools monitors
- [redux-devtools-log-monitor](https://github.com/gaearon/redux-devtools-log-monitor): The default tree view monitor for Redux DevTools
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)
- [sinon](https://github.com/cjohansen/Sinon.JS): JavaScript test spies, stubs and mocks.
- [style-loader](https://github.com/webpack/style-loader): style loader module for webpack
- [supertest](https://github.com/visionmedia/supertest): SuperAgent driven library for testing HTTP servers
- [url-loader](https://github.com/webpack/url-loader): url loader module for webpack
- [webpack](https://github.com/webpack/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): Offers a dev middleware for webpack, which arguments a live bundle to a directory
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server): Serves a webpack app. Updates the browser on changes.
- [webpack-externals-plugin](https://github.com/Morhaus/webpack-externals-plugin): Provides more powerful externals configuration options
- [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware): Webpack hot reloading you can attach to your own server
- [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin): webpack plugin for generating asset manifests

## License

MIT
