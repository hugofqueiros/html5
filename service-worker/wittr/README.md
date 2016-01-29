# Wittr

This is a silly little demo app for an offline-first course.

# Installing

Dependencies:

* [Node.js](https://nodejs.org/en/) v0.21.7 or above

Then check out the project and run:

```sh
npm install
```

# Running

```sh
npm run serve
```

You should now have the app server at [localhost:8888](http://localhost:8888) 
and the config server at [localhost:8889](http://localhost:8889).

You can also configure the ports:

```sh
npm run serve -- --server-port=8000 --config-server-port=8001
```

# At config server localhost:8889
write: 'demo' (for perfect and offline)

change config to Lie-fi
and write on test results: lie-fi

## in sw/index.js write console.log('Hello')
see: http://localhost:8888/sw.js

## to test the register: type: 'registered' in the test ID

1. it works fine in localhost

## change fetch method and reload (watch dev tools resources service workers)
type sw-waiting

close tab or go to another url
type sw-active

##
type: html-response

## to intersept fetchs that end with *.jpg
type gif-response

## to check cache install
type install-cached

## do code on fetch event using cache and everything will be working if you are offline
type cache-served