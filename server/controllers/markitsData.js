'use strict';

module.exports.markitsData = response;

var markitsPath = 'http://markets.ft.com/research/webservices/companies/v1/financialperformance?period=q&source=12345&';

var companies = {
	google: 'symbols=GOOGL:NSQ',
	pets: 'symbols=PETS:LSE',
	sky: 'symbols=SKY:LSE',
    publicis: 'symbols=PUB:PAR',
    verizon: 'symbols=VZ:NSQ',
    yahoo: 'symbols=YHOO:NSQ'
};

var Poller = require('ft-poller'),
    response = {};

var google = new Poller({
    url: markitsPath + companies.google,
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.google = data;
    }
});

var pets = new Poller({
    url: markitsPath + companies.pets, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.rbos = data;
    }
});

var sky = new Poller({
    url: markitsPath + companies.sky, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

var publicis = new Poller({
    url: markitsPath + companies.publicis, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

var verizon = new Poller({
    url: markitsPath + companies.verizon, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

var yahoo = new Poller({
    url: markitsPath + companies.yahoo, 
    options: {}, //optional object compatible with isomorphic-fetch
    refreshInterval: 2000,
    parseData: function (data) {
        response.songbird = data;
    }
});

google.start({ initialRequest: true });
pets.start({ initialRequest: true });
sky.start({ initialRequest: true });
publicis.start({ initialRequest: true });
verizon.start({ initialRequest: true });
yahoo.start({ initialRequest: true });

console.log(response);