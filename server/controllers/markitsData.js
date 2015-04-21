'use strict';
var markitsPath = 'http://markets.ft.com/research/webservices/companies/v1/financialperformance?period=q&source=12345&';

var companies = {
	google: 'symbols=GOOGL:NSQ',
	pets: 'symbols=PETS:LSE',
	sky: 'symbols=SKY:LSE',
    publicis: 'symbols=PUB:PAR',
    verizon: 'symbols=VZ:NSQ',
    yahoo: 'symbols=YHOO:NSQ',
    bankofscotland: 'symbols=RBS:LSE',
    creditsuisse: 'symbols=CSGN:VTX'
};

var Poller = require('ft-poller'),
    response = {};

var google = new Poller({
    url: markitsPath + companies.google,
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        console.log('I got data for google...', data);
        response.google = data;
    }
});

var pets = new Poller({
    url: markitsPath + companies.pets, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.pets = data;
    }
});

var sky = new Poller({
    url: markitsPath + companies.sky, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.sky = data;
    }
});

var publicis = new Poller({
    url: markitsPath + companies.publicis, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.publicis = data;
    }
});

var verizon = new Poller({
    url: markitsPath + companies.verizon, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.verizon = data;
    }
});

var yahoo = new Poller({
    url: markitsPath + companies.yahoo, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.yahoo = data;
    }
});

var songbird = new Poller({
    url: markitsPath + companies.songbird, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

var bankofscotland = new Poller({
    url: markitsPath + companies.bankofscotland, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.bankofscotland = data;
    }
});

var creditsuisse = new Poller({
    url: markitsPath + companies.creditsuisse, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.creditsuisse = data;
    }
});

google.start({ initialRequest: true });
pets.start({ initialRequest: true });
sky.start({ initialRequest: true });
publicis.start({ initialRequest: true });
verizon.start({ initialRequest: true });
yahoo.start({ initialRequest: true });
songbird.start({ initialRequest: true });
bankofscotland.start({ initialRequest: true });
creditsuisse.start({ initialRequest: true });

module.exports = response;

