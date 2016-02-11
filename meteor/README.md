# METEOR

## First meteor APP (simple-todos)
[First meteor app](https://www.meteor.com/tutorials/blaze/creating-an-app)

```
simple-todos.js       # a JavaScript file loaded on both client and server
simple-todos.html     # an HTML file that defines view templates
simple-todos.css      # a CSS file to define your app's styles
.meteor               # internal Meteor files
```

simple-todos file contains both the JavaScript required to start the client and the server

### To run it
```
cd simple-todos
meteor
```

### Structure
Meteor uses a handlebar curly-brackets style syntax. All of the code in your HTML 
files is compiled with Meteor’s Spacebars compiler. Spacebars uses statements surrounded 
by double curly braces such as {{#each}} and {{#if}} to let you add logic and data to your 
views.

You can pass data into templates from your JavaScript code by defining helpers, 
and to iterate arrays we can use {{#each items}}

### How the HTML files Work
Meteor parses all of the HTML files in your app folder and identifies three top-level tags: 
<head>, <body>, and <template>.

Everything inside any <head> tags is added to the head section of the HTML sent to the client,
 and everything inside <body> tags is added to the body section, just like in a regular HTML file.

Everything inside <template> tags is compiled into Meteor templates, which can be included
 inside HTML with {{> templateName}} or referenced in your JavaScript with Template.templateName.
 
## Meteor packages
The meteor project has a public package server of isobuild packages. 
This enables you to quickly add functionality to your Meteor app simply 
by installing a package via the meteor add <package name> syntax.

### Adding npm Packages
Meteor can also add npm packages via the meteor add <package name> syntax. 
Let’s make our display a little nicer in our previous example by adding the moments package for easy date formatting.

```
$ meteor add momentjs:moment
```

### OAuth
Adding OAuth authentication to your app is now really simple. 
It can be achieved by just adding two packages via the following command:
```
$ meteor add accounts-google
$ meteor add accounts-ui
```

Once these packages are added to your app, you can simply add the {{> loginButtons}} 
built-in template to your my_meteor_app.html file. Reloading in a browser you will see 
a button to configure the Google login feature.