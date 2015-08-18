/**
 * Created by hfq on 17-08-2015.
 */

'use strict';

    // on package file tests
/*    "predeploy": "echo im about to deploy",
 "postdeploy": "echo ive deployed",
 "prepublish": "coffee --bare --compile --output lib/foo src/foo*//*.coffee",*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var es = require('event-stream');
var pj = require('./package.json');
var concat = require('gulp-concat');
var path = require('path');
var http = require('http');
var livereload = require('gulp-livereload');
var st = require('st');
var less = require('gulp-less');
var del = require('del');
var runSequence = require('run-sequence');






