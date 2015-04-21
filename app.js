'use strict';

var express = require('express');
var expressHandlebars = require('express-handlebars');
var app = express();

var twitter = require('./server/controllers/twitter.js');
var companyData = require('./server/controllers/companyData.js');
var markitsData = require('./server/controllers/markitsData.js');

var jsonParser = require('./server/view-helpers/jsonParser');
var tickerSymbol = require('./server/view-helpers/tickerSymbol.js');
var search = require('./server/controllers/search.js');

//required so that express-handlebars and the helpers use the same version of hb
//this prevents odd things happening with helpers etc.
var Handlebars = require('handlebars');

app.engine('.html', expressHandlebars({
    extname: '.html',
    handlebars: Handlebars,
    helpers: {
        makeJson: jsonParser,
        getTickerSymbol: tickerSymbol
    }
}));

app.set('view engine', '.html');

app.get('/', function(req, res){
	res.redirect('/earnings');
});

app.get('/earnings', function(req, res){
	var cardName = markitsData.google.data.items[0].basic.name;
	console.log('md!!!!!', cardName);
	res.render('earnings', {
		title:'Boom town',
		data: {
			markit: markitsData,
			companyData:companyData,
			cardName: cardName
		}
	});
});

app.get('/twitter', twitter);

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3333;

var server = app.listen(port, function () {
    var host = server.address().address;
    console.log('Example app listening at http://%s:%s', host, port);
});