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

## PostCSS
Configuration with postcss and CSS modules
- autoprefixer
- precss - glues a bunch of common postcss plugins together and cssnano, which does
the same for minification and production environments
- cssnano

## CSS modules 
The styles object exports an object with the name of the css class as 
the key and a unique name for the CSS class as the value.

```shell
"container" = "src-App-module__container__2vYsV"
```

We can apply the CSS class by adding it as a className in our React 
component as we would any other prop.

```
// ...
import styles from './styles.module.css'

const App = React.createClass({
  render: function() {
    return (
      <div className={styles['container']}>
        Text text text
      </div>
    );
  }
});
// ...
```

## Configuring Multiple Environments
One effective method for key handling is by using the environment variables
 of the system we’re building against and bundling our key. Using a combination
  of the webpack.DefinePlugin() and dotenv, we can create a multi-environment 
  build process using our environment variables.
  
  The dotenv project allows us to load configuration scripts and gives 
  us access to these variables.


## Test
```shell
npm test
```

```shell
npm run test:watch
```

## License
 [MIT](/LICENSE)