'use strict';
var request = require('request');
var esUrl = 'https://' + process.env.ES + '/v2_api_v2/item/_search';
var response = {};

var searchBody = {
	"query": {
		"filtered": {
		    "query": {
				"match": {
					"title": "Songbird"
				}
			},
			"filter": {
				"term": {
					"annotations.uri": "http://api.ft.com/things/82bd314e-ba58-30c0-842e-a9191522daa3"
				}
			}
		}
	},
	"size": 3
};


// {
// "predicate": "http://www.ft.com/ontology/annotation/mentions",
// "apiUrl": "http://mapi.ft.com/organisations/66df4a9c-df16-3847-b08a-92e42f16c3b9",
// "label": "Credit Suisse AG",
// "type": "ORGANISATION",
// "uri": "http://api.ft.com/things/66df4a9c-df16-3847-b08a-92e42f16c3b9"
// }

var search = function (q, uri, cb) {
	searchBody.query.filtered.query.match.title = q;
	searchBody.query.filtered.filter.term['annotations.uri'] = uri;
	request({
		url: esUrl,
		method: 'POST',
		json: true,
		body: searchBody
	}, function (err, response, body) {
		if (err) {
			cb(err);
		} else {
			cb(null, body);
		}
	});
};

search('Songbird', 'http://api.ft.com/things/82bd314e-ba58-30c0-842e-a9191522daa3', function (err, data) {
	if (err) {
		console.log(err);
	} else {
		response.songbird = data;
	}
});

search('Google', 'http://api.ft.com/things/ccaa202e-3d27-3b75-b2f2-261cf5038a1f', function (err, data) {
	if (err) {
		console.log(err);
	} else {
		response.google = data;
	}
});

search('Royal Bank of Scotland', 'http://api.ft.com/things/dc687ac8-70c7-3f64-8dfa-81ce34a4d234', function (err, data) {
	if (err) {
		console.log(err);
	} else {
		response.rbos = data;
	}
});

search('Credit Suisse', 'http://api.ft.com/things/66df4a9c-df16-3847-b08a-92e42f16c3b9', function (err, data) {
	if (err) {
		console.log(err);
	} else {
		response.cs = data;
	}
});

setTimeout(function () {
	console.log(response);
}, 2000);
module.exports = response;
