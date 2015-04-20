'use strict';

var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();

var jsonParser = require('./server/view-helpers/jsonParser');

//required so that express-handlebars and the helpers use the same version of hb
//this prevents odd things happening with helpers etc.
var Handlebars = require('handlebars');

app.engine('.html', expressHandlebars({
    extname: '.html',
    handlebars: Handlebars,
    helpers: {
        makeJson: jsonParser
    }
}));

app.set('view engine', '.html');

app.get('/', function(req, res){
    res.render('main');
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3333;

var server = app.listen(port, function () {
    var host = server.address().address;
    console.log('Example app listening at http://%s:%s', host, port);
});