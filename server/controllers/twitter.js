'use strict';
var Blitline = require('simple_blitline_node');
var nodeutil = require('util');
var blitline = new Blitline();

/* Replace MY_APP_ID with your Blitline applicationID */
var applicationID = process.env.BITLINE;


var companies = {
	cs: {
		title: "Credit Suisse",
		text: "Credit Suisse Group AG had 4th quarter 2014 revenues \nof 6.38bn. This bettered the 5.99bn consensus of \nthe 4 analysts covering the company. This was 3.07% \nbelow the prior year's 4th quarter results.",
		img: "http://markets.ft.com/Research/API/ChartBuilder?t=equities&p=eyJzeW1ib2wiOiI4MjA3MCIsInJlZ2lvbiI6bnVsbCwiaGVpZ2h0IjoiMjUyIiwid2lkdGgiOiIzNTYiLCJsaW5lU3R5bGUiOiJsaW5lIiwiZHVyYXRpb24iOiIzNjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IkNyZWRpdCBTdWlzc2Ugc2hhcmUgcGVyZm9ybWFuY2UiLCJzZWNvbmRhcnlMYWJlbCI6IjEgeWVhciB0byBBcHIgMjEiLCJ0ZXJ0aWFyeUxhYmVsIjpudWxsLCJxdWF0ZXJuYXJ5TGFiZWwiOm51bGwsImlzTW9iaWxlIjpmYWxzZSwiU2hvd0Rpc2NsYWltZXIiOnRydWUsInVuaXQiOiJweCJ9"
	},
	google: {
		title: "Google",
		text: "",
		img: "http://markets.ft.com/Research/API/ChartBuilder?t=equities&p=eyJzeW1ib2wiOiIxNDA4NjQiLCJyZWdpb24iOm51bGwsImhlaWdodCI6IjI1MiIsIndpZHRoIjoiMzU2IiwibGluZVN0eWxlIjoibGluZSIsImR1cmF0aW9uIjoiMzY1Iiwic3RhcnREYXRlIjpudWxsLCJlbmREYXRlIjpudWxsLCJwcmltYXJ5TGFiZWwiOiJHb29nbGUgc2hhcmUgcGVyZm9ybWFuY2UiLCJzZWNvbmRhcnlMYWJlbCI6IjEgeWVhciB0byBBcHIgMjEiLCJ0ZXJ0aWFyeUxhYmVsIjpudWxsLCJxdWF0ZXJuYXJ5TGFiZWwiOm51bGwsImlzTW9iaWxlIjpmYWxzZSwiU2hvd0Rpc2NsYWltZXIiOnRydWUsInVuaXQiOiJweCJ9"
	},
	sky: {
		title: "Sky",
		text: "",
		img: "http://markets.ft.com/Research/API/ChartBuilder?t=equities&p=eyJzeW1ib2wiOiI2NjcwMiIsInJlZ2lvbiI6bnVsbCwiaGVpZ2h0IjoiMjUyIiwid2lkdGgiOiIzNTYiLCJsaW5lU3R5bGUiOiJsaW5lIiwiZHVyYXRpb24iOiIzNjUiLCJzdGFydERhdGUiOm51bGwsImVuZERhdGUiOm51bGwsInByaW1hcnlMYWJlbCI6IlNreSBzaGFyZSBwZXJmb3JtYW5jZSIsInNlY29uZGFyeUxhYmVsIjoiMSB5ZWFyIHRvIEFwciAyMSIsInRlcnRpYXJ5TGFiZWwiOm51bGwsInF1YXRlcm5hcnlMYWJlbCI6bnVsbCwiaXNNb2JpbGUiOmZhbHNlLCJTaG93RGlzY2xhaW1lciI6dHJ1ZSwidW5pdCI6InB4In0="
	},
	rbos: {
		title: "Royal Bank of Scotland",
		text: "",
		img: "http://markets.ft.com/Research/API/ChartBuilder?t=equities&p=eyJzeW1ib2wiOiIyMzk0ODMiLCJyZWdpb24iOm51bGwsImhlaWdodCI6IjI1NyIsIndpZHRoIjoiMzU2IiwibGluZVN0eWxlIjoibGluZSIsImR1cmF0aW9uIjoiMzY1Iiwic3RhcnREYXRlIjpudWxsLCJlbmREYXRlIjpudWxsLCJwcmltYXJ5TGFiZWwiOiJSb3lhbCBCYW5rIG9mIFNjb3RsYW5kIHNoYXJlIHByaWNlIHBlcmZvcm1hbmNlIiwic2Vjb25kYXJ5TGFiZWwiOiIxIHllYXIgdG8gQXByIDIxIiwidGVydGlhcnlMYWJlbCI6bnVsbCwicXVhdGVybmFyeUxhYmVsIjpudWxsLCJpc01vYmlsZSI6ZmFsc2UsIlNob3dEaXNjbGFpbWVyIjp0cnVlLCJ1bml0IjoicHgifQ=="
	}
};

function createTwitterImage (req, res) {
	if(req.query.company) {
		var company = req.query.company;
		blitline.addJob({
		    "application_id": applicationID,
		    "src":"http://www.ft-static.com/sp/prod/snapshot/backgroundV1.png",
		    "functions":[
		        {
				    "name": "annotate",
				    "params": {
				        "text": companies[company].title,
				        "color":"#fff",
				        "point_size": 18,
				        "y": 85,
				        "x": 10,
				        "gravity": "NorthWestGravity"
				    },
				    functions: [
					    {
					    	"name": "annotate",
						    "params": {
						        "text": companies[company].text,
						        "color":"#5E5E5E",
						        "point_size": 14,
						        "y": 400,
				        		"x": 10,
						        "gravity": "NorthWestGravity"
						    },
				            functions: [
				            	{
				            		"name":"composite",
    								"params":{
    									"src": companies[company].img,
    									"y": 120,
						        		"x": 20,
								        "gravity": "NorthWestGravity"
    								},
								    "save": {
						                "image_identifier": companies[company].title
						            }
				            	}
				            ]
					    }
				    ]
		        }
		    ]
		});	

		blitline.postJobs(function(response) {
			console.log(nodeutil.inspect(response, { depth:10, colors: true }));
			setTimeout(function () {
				console.log(response);
				if (response && response.results && response.results[0]) {
					res.send('<img src="'+response.results[0].images[0].s3_url+'"/>');	
				} else {
					res.send('No image returned');
				}
				
			}, 3000);
			
		});		
	} else {
		res.send('Nope');
	}

	
}


module.exports = function (req, res) {
	createTwitterImage(req, res);
};