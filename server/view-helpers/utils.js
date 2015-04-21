'use strict';

var markitsData = require('../controllers/markitsData.js');

module.exports.getChartUrl = function (str) {
	var baseUrl = "http://markets.ft.com/Research/API/ChartBuilder?t=equities&";
	var charts = {
		"google": 		  "p=eyJzeW1ib2wiOiIxNDA4NjQiLCJyZWdpb24iOm51bGwsImhlaWdodCI6IjI1MiIsIndpZHRoIjoiMzU2IiwibGluZVN0eWxlIjoibGluZSIsImR1cmF0aW9uIjoiMzY1Iiwic3RhcnREYXRlIjpudWxsLCJlbmREYXRlIjpudWxsLCJwcmltYXJ5TGFiZWwiOiJHb29nbGUgc2hhcmUgcGVyZm9ybWFuY2UiLCJzZWNvbmRhcnlMYWJlbCI6IjEgeWVhciB0byBBcHIgMjEiLCJ0ZXJ0aWFyeUxhYmVsIjpudWxsLCJxdWF0ZXJuYXJ5TGFiZWwiOm51bGwsImlzTW9iaWxlIjpmYWxzZSwiU2hvd0Rpc2NsYWltZXIiOnRydWUsInVuaXQiOiJweCJ9",
		"bankofscotland": "p=eyJzeW1ib2wiOiIyMzk0ODMiLCJyZWdpb24iOm51bGwsImhlaWdodCI6IjI1NyIsIndpZHRoIjoiMzU2IiwibGluZVN0eWxlIjoibGluZSIsImR1cmF0aW9uIjoiMzY1Iiwic3RhcnREYXRlIjpudWxsLCJlbmREYXRlIjpudWxsLCJwcmltYXJ5TGFiZWwiOiJSb3lhbCBCYW5rIG9mIFNjb3RsYW5kIHNoYXJlIHByaWNlIHBlcmZvcm1hbmNlIiwic2Vjb25kYXJ5TGFiZWwiOiIxIHllYXIgdG8gQXByIDIxIiwidGVydGlhcnlMYWJlbCI6bnVsbCwicXVhdGVybmFyeUxhYmVsIjpudWxsLCJpc01vYmlsZSI6ZmFsc2UsIlNob3dEaXNjbGFpbWVyIjp0cnVlLCJ1bml0IjoicHgifQ==",
		"creditsuisse":   "p=eyJzeW1ib2wiOiI4MjA3MCIsInJlZ2lvbiI6bnVsbCwiaGVpZ2h0IjoiMjUyIiwid2lkdGgiOiIzNTYiLCJsaW5lU3R5bGUiOiJsaW5lIiwiZHVyYXRpb24iOiIzNjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IkNyZWRpdCBTdWlzc2Ugc2hhcmUgcGVyZm9ybWFuY2UiLCJzZWNvbmRhcnlMYWJlbCI6IjEgeWVhciB0byBBcHIgMjEiLCJ0ZXJ0aWFyeUxhYmVsIjpudWxsLCJxdWF0ZXJuYXJ5TGFiZWwiOm51bGwsImlzTW9iaWxlIjpmYWxzZSwiU2hvd0Rpc2NsYWltZXIiOnRydWUsInVuaXQiOiJweCJ9",
		"sky": 			  "p=eyJzeW1ib2wiOiI2NjcwMiIsInJlZ2lvbiI6bnVsbCwiaGVpZ2h0IjoiMjUyIiwid2lkdGgiOiIzNTYiLCJsaW5lU3R5bGUiOiJsaW5lIiwiZHVyYXRpb24iOiIzNjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IlNreSBzaGFyZSBwZXJmb3JtYW5jZSIsInNlY29uZGFyeUxhYmVsIjoiMSB5ZWFyIHRvIEFwciAyMSIsInRlcnRpYXJ5TGFiZWwiOm51bGwsInF1YXRlcm5hcnlMYWJlbCI6bnVsbCwiaXNNb2JpbGUiOmZhbHNlLCJTaG93RGlzY2xhaW1lciI6dHJ1ZSwidW5pdCI6InB4In0="
	};

	return baseUrl + charts[str];
};

module.exports.getClassName = function (str) {
	console.log("looking at str, ", str);
	var codes = {
		"sky": "typeA",
		"google": "typeB",
		"bankofscotland": "typeC",
		"creditsuisse": "typeD",
		"yahoo": "typeE",
		"verizon": "typeF",
	};

	return codes[str];
};

function getMarkitsData(str) {
	var companyData = markitsData[str];
	
	console.log('got markitsData:', markitsData);
	var reducedData = {
		"companyName": str,
		"quarter": "4",
		"year": "2015",
		"revenueStr": "Information about " + str + "'s revenue",
		"earningsStr": "Information about " + str + "'s earnings",
		"timestamp": "21 Jan 2015"
	};

	try {
		reducedData.companyName = companyData.data.items[0].basic.name;
	} catch (e) {
		console.log('No data available for name for ', str);
	}

	try {
		reducedData.quarter = companyData.data.items[0].performanceAnnouncements.revenue.announcements.historical[0].quarter;
		reducedData.year = companyData.data.items[0].performanceAnnouncements.revenue.announcements.historical[0].year;
		reducedData.timestamp = companyData.data.items[0].performanceAnnouncements.revenue.announcements.historical[0].announceDate;
	} catch (e) {
		console.log('No data available for quarter or year for ', str);
	}

	try {
		reducedData.revenueStr = companyData.data.items[0].performanceAnnouncements.revenue.smartText;
		reducedData.earningsStr = companyData.data.items[0].performanceAnnouncements.earnings.smartText;
	} catch (e) {
		console.log("No data available for smart text for revenue or earnings", str);
	}

	return reducedData;
}


module.exports.getReformattedData = function () {
	var data = {
		"sky": getMarkitsData("sky"),
		"google": getMarkitsData("google"),
		"bankofscotland": getMarkitsData("bankofscotland"),
		"creditsuisse": getMarkitsData("creditsuisse")
	};

	return data;
};