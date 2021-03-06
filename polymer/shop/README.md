# SHOP

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

Need at least v0.3.0

##### Setup

    git clone https://github.com/Polymer/shop.git
    cd shop
    bower install

### Start the development server

    polymer serve

### Run web-component-tester tests

    polymer test

### Build

    polymer build
    
# Polymer-cli

## Overview

Polymer-CLI includes a number of tools for working with Polymer and Web Components:

  * __init__ - Initializes a Polymer project from one of several templates
  * __build__	- Builds an application-style project
  * __lint__ - Lints the project
  * __serve__	- Runs a development server
  * __test__ - Runs tests with web-component-tester

## Installation

Install via npm:

    $ npm install -g polymer-cli

Then run via `polymer <command>`:

    $ polymer help

## Project Structure

Polymer-CLI is somewhat opinionated about project structure.

There are two type of projects:

* Elements projects

  Element projects contain one or more reusable element definitions, intended to be used from other elements, applications or pages. Element definitions live at the top level of the project so they are easy to import. Elements import their dependencies with relative paths that reference sibling folders to the project folder.

* Application projects

  Application projects are self-contained and intended to be deployed as a standalone website. Application projects contain elements in a `src/` folder and import their dependencies with absolute paths, or relative paths that reference folders inside the project folder.

### Application Styles

Polymer-CLI currently supports two styles of applications:

  * Monolithic applications, which have a single entrypoint (usually index.html) and eagerly import all dependencies.

  * "App shell" applications, which have a very lightweight entrypoint, an app-shell with startup and routing logic, and possibly lazy loaded fragments.

### App-shell Structure

App-shell apps are currently the preferred style for Polymer CLI, and most commands are being optimized to support them. App-shell apps usually have client-side routing (see the [app-route](https://github.com/PolymerElements/app-route) element), and lazy load parts of the UI on demand.

Polymer-CLI supports this style by understand these different types of files:

  * entrypoint - The first file served by the web server for every valid route (usually index.html). This file should be very small, since it may not cache well and must reference resources with absolute URLs, due to being served from many URLs.
  * shell - The actual app shell, which includes the top-level logic, routing, and so on.
  * fragments - lazy loaded parts of the application, typically views and other elements loaded on-demand.

## Configuration

The project files are specified either as global flags: `--entrypoint`, `--shell` and zero or more `--fragment` flags, or in a `polymer.json` configuration file.

### polymer.json

You can specify the project files in `polymer.json` so that commands like `polymer build` work without flags:

```json
{
  "entrypoint": "index.html",
  "shell": "src/my-app/my-app.html",
  "fragments": [
    "src/app-home/app-home.html",
    "src/app-view-1/app-view-1.html",
  ],
}
```

## Commands

### help

Displays help on commands and options:

    $ polymer help

### init

Initializes a Polymer project from one of several templates.

Choose a template from a menu:

    $ polymer init

Use the 'element' template:

    $ polymer init element

Use the 'application' template:

    $ polymer init application

### lint

With a `polymer.json` file:

    $ polymer lint

Specifying a file to lint:

    $ polymer lint index.html

### test

Run test with web-component-tester:

    $ polymer test

### build

Specify project files as flags:

    $ polymer build --entrypoint index.html --shell src/my-app/my-app.html

Use `index.html` as the entryopint, or read from `polymer.json`:

    $ polymer build

`build` is opinionated and defaults to a good build for app-shell apps. It works very much like a pre-configured gulpfile. Over time the build steps that Polymer-CLI uses will be available for use with Gulp, and the CLI will add hooks that let you extend it's functionality via Gulp.

`build` writes the built output to `build/bundled` and `build/unbundled` folders. Both outputs have been run though HTML, JS and CSS optimizers, and have a Service Worked generated for them. The bundled folder contains the application files process by Vulcanize, Polymer's HTML bundler, for optimal loading via HTTP/1. The unbundled folder is optimized for HTTP/2 + Push.

### serve

Start the development server:

    $ polymer serve

Start the development server, and open the default browser:

    $ polymer serve -o

## Templates and Generators

Polymer-CLI initialize new projects with the `init` command, and includes
a few of built-in templates.

New templates can be distributed and installed via npm. Yeoman generators
prefixed with `generator-polymer-init` will show up in the `polymer init`
menu.

## Compiling from Source

    $ npm run build

You can compile and run the CLI from source by cloning the repo from Github and then running `npm run build`. But make sure you have already run `npm install` before building.

## Supported node.js versions

Polymer CLI targets the current LTS version (4.x) of Node.js and later.