'use strict';

var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();

var twitter = require('./server/controllers/twitter.js');

var jsonParser = require('./server/view-helpers/jsonParser');
var utils = require('./server/view-helpers/utils.js'),
    reformattedMarkitsData = utils.getReformattedData;

var search = require('./server/controllers/search.js');

//required so that express-handlebars and the helpers use the same version of hb
//this prevents odd things happening with helpers etc.
var Handlebars = require('handlebars');

app.engine('.html', expressHandlebars({
    extname: '.html',
    handlebars: Handlebars,
    helpers: {
        makeJson: jsonParser,
        chartUrl: utils.getChartUrl,
        className: utils.getClassName
    }
}));

app.set('view engine', '.html');

app.get('/', function(req, res){
	res.redirect('/earnings');
});

app.get('/earnings', function(req, res){
    console.log('trying to render....')
    res.render('earnings', {
        "markitdata": reformattedMarkitsData()
    });
});

app.get('/twitter', twitter);

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3333;

var server = app.listen(port, function () {
    var host = server.address().address;
    console.log('Example app listening at http://%s:%s', host, port);
});