'use strict';



var mapiPath = 'http://mapi.ft.com/organisations/';
var apiKey = process.env.APIKEY;

var companies = {
	google: 'ccaa202e-3d27-3b75-b2f2-261cf5038a1f',
	rbos: 'dc687ac8-70c7-3f64-8dfa-81ce34a4d234',
	songbird: '82bd314e-ba58-30c0-842e-a9191522daa3',
	creditsuisse: '66df4a9c-df16-3847-b08a-92e42f16c3b9'
};

var Poller = require('ft-poller'),
    response = {};

var google = new Poller({
    url: mapiPath + companies.google + '?apiKey=' + apiKey, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.google = data;
        response.google.memberships = response.memberships.slice(0,2);
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

var creditsuisse = new Poller({
    url: mapiPath + companies.creditsuisse + '?apiKey=' + apiKey, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.creditsuisse = data;
    }
});

google.start({ initialRequest: true });
rbos.start({ initialRequest: true });
songbird.start({ initialRequest: true });
creditsuisse.start({ initialRequest: true });


module.exports = response;
// setTimeout(function () {
// 	console.log(response.rbos);
// }, 2000);