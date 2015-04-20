'use strict';
var companyData = function (req, res) {
	res.send(response);
};

module.exports = companyData;

var mapiPath = 'http://mapi.ft.com/organisations/';
var apiKey = process.env.APIKEY;

var companies = {
	google: 'ccaa202e-3d27-3b75-b2f2-261cf5038a1f',
	rbos: 'dc687ac8-70c7-3f64-8dfa-81ce34a4d234',
	songbird: '82bd314e-ba58-30c0-842e-a9191522daa3'
};

var Poller = require('ft-poller'),
    response = {};

var google = new Poller({
    url: mapiPath + companies.google + '?apiKey=' + apiKey, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.google = data;
    }
});

var rbos = new Poller({
    url: mapiPath + companies.rbos + '?apiKey=' + apiKey, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.rbos = data;
    }
});

var songbird = new Poller({
    url: mapiPath + companies.songbird + '?apiKey=' + apiKey, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

google.start({ initialRequest: true });
rbos.start({ initialRequest: true });
songbird.start({ initialRequest: true });

console.log(response);