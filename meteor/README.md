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
HTML Files in Meteor define templates.

Meteor parses all of the HTML files in your app folder and identifies three top-level tags: 
<head>, <body>, and <template>.

Everything inside any <head> tags is added to the head section of the HTML sent to the client,
 and everything inside <body> tags is added to the body section, just like in a regular HTML file.

Everything inside <template> tags is compiled into Meteor templates, which can be included
 inside HTML with {{> templateName}} or referenced in your JavaScript with Template.templateName.
 
### Adding logic and data to templates
All of the code in the HTML files is compiled with Meteor's Spacebars compiler (https://github.com/meteor/meteor/blob/devel/packages/spacebars/README.md)
(inspired by handlebars)

You can pass data into templates from your JS code by defining helpers. A helper called ```tasks```
on ```Template.body``` that returns an array. Inside the body tag of the HTML, we can use {{#each tasks}}
 to iterate over the array and insert a task template for each value. Inside the #each block, we can 
 display the text property of each array item using {{text}} 
 
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

### Persistent Data
Collections are Meteor's way of storing persistent data. The special thing about collections
 in Meteor is that they can be accessed from both the server and the client, making it easy to write view logic without
 having to write a lot of server code. They also update themselfs automatically.
 
 - meteor mongo
 - db.tasks.insert({ text: "Hello world!", createdAt: new Date() });
 
### Attaching events to templates
 - ```Template.templateName.events(...)```

 1. inserting into a collection ```Tasks.insert()```
 
### Deploying the app
```
meteor deploy my_app_name.meteor.com
```

## Running Mobile

### Running ans IOS simulator (Mac Only)
```
meteor install-sdk ios
```

### Running on an Android emulator
```
meteor install-sdk android
```
https://github.com/meteor/meteor/wiki/Mobile-Development-Install:-Android-on-Linux

If you want to point your app to the server you deployed in the previous step run:
```
meteor run android-device --mobile-server my_app_name.meteor.com
```


