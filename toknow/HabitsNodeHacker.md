## 1- Start every new project with npm init
npm init --yes

add to package.json:

"engines": {
 "node": "4.2.1"
}

## 2 - User a smart .npmrc
By default, npm doesn't save installed dependencies to package.json (and you should always track your dependencies!).

npm install foobar --save --save-exact

Even better, you can set these options in ~/.npmrc to update your defaults:
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc

## 3 - Hop on the ES6 train

let user = users.find(u => u.id === ID);

console.log(`Hello, ${ user.name }!`);

## 4 - Stick with lowercase
let MyClass = require('my-class');

## 5 - Cluster your app
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

## 6 - Be environmentally aware
Don't litter your project with environment-specific config files! Instead, take advantage of environment variables.
Install node-foreman

$ npm install --save --save-exact foreman
Next, create a Procfile to specify your app's process types:
web: bin/web
worker: bin/worker
Now you can start your app with the nf binary:
"scripts": {
  "start": "nf start"
}

To provide a local development environment, create a .gitignore'd .env file, which will be loaded by node-foreman:
DATABASE_URL='postgres://localhost/foobar'
HTTP_TIMEOUT=10000

Now, a single command (npm start) will spin up both a web process and a worker process in that environment.
 And, when you deploy your project, it will automatically adapt to the variables on its new host.
This is simpler and more flexible than 'config/abby-dev.js', 'config/brian-dev.js',
 'config/qa1.js', 'config/qa2.js', 'config/prod.js', etc.

## 7 Avoid garbage
Node (V8) uses a lazy and greedy garbage collector. With its default limit of about 1.5 GB, it sometimes waits until it absolutely has to before reclaiming unused memory. If your memory usage is increasing, it might not be a leak - but rather node's usual lazy behavior.
To gain more control over your app's garbage collector, you can provide flags to V8 in your Procfile:
web: node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js

This is especially important if your app is running in an environment with less than 1.5 GB of available memory.
 For example, if you'd like to tailor node to a 512 MB container, try:
web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 server.js

## 8 Hook things up
Npm's lifecycle scripts make great hooks for automation. If you need to run something before building your app, you can use the preinstall script. Need to build assets with grunt, gulp, browserify, or webpack? Do it in a postinstall script.
In package.json:
"scripts": {
  "postinstall": "bower install && grunt build",
  "start": "nf start"
}
You can also use environment variables to control these scripts:
"postinstall": "if $BUILD_ASSETS; then npm run build-assets; fi",
"build-assets": "bower install && grunt build"
If your scripts start getting out of control, move them to files:
"postinstall": "scripts/postinstall.sh"

## 9 Only git the important bits
If you've accidentally checked in node_modules before, that's okay. You can remove it like this:
$ echo 'node_modules' >> .gitignore
$ git rm -r --cached node_modules
$ git commit -am 'ignore node_modules'
I also ignore npm's logs so they don't clutter my code:
$ echo 'npm-debug.log' >> .gitignore
$ git commit -am 'ignore npm-debug'

## 10 Simplify

Tech predictions are famously inaccurate, but I'll make one here for the upcoming year.
 I predict that 2016 will be the year of simplification in JavaScript.

