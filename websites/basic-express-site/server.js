/**
 * Created by hugo.queiros on 14/03/16.
 */
var express = require('express');
var logger = require('morgan');
var app = express();
var template = require('jade').compileFile(__dirname + '/src/templates/homepage.jade');

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res, next) {
    try {
        var html = template({ title: 'Home' });
        res.send(html)
    } catch (e) {
        next(e)
    }
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 8080))
});