# React Yelp Clone

## Quickstart

# install the dependencies
npm install

# start the server
npm start

## Running the Tests

The application is built using tests, including the fantastic [enzyme](https://github.com/airbnb/enzyme) and [chai](http://chaijs.com) libraries. To run the tests, use the `npm` test script:

```shell
npm run test
```

## Babel config

Babel allows us to configure different options for different operating environments 
using the env key in the babel configuration object. We’ll include the babel-hmre preset 
only in our development environment (so our production bundle doesn’t include the hot 
reloading JavaScript).

## Webpack
We’ll be building our webpack configuration with the help of a well-built
 webpack starter tool called hjs-webpack.

The hjs-webpack build tool sets up common loaders for both development 
and production environments, including hot reloading, minification, 
ES6 templates, etc.

### hjs-webpack
The hjs-webpack package exports a single function that accepts a single 
argument, an object that defines some simple configuration to define a
 required webpack configuration. There are only two required keys in this
  object:

in - A single entry file
out - the path to a directory to generate files

## License
 [MIT](/LICENSE)