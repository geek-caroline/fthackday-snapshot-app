'use strict';
var Blitline = require('simple_blitline_node');
var nodeutil = require('util');
var blitline = new Blitline();

/* Replace MY_APP_ID with your Blitline applicationID */
var applicationID = process.env.BITLINE;

function createTwitterImage (req, res) {
	if(req.query.text && req.query.id) {
		blitline.addJob({
		    "application_id": applicationID,
		    "src":"http://www.ft-static.com/sp/prod/snapshot/backgroundV1.png",
		    "functions":[
		        {
				    "name": "annotate",
				    "params": {
				        "text": req.query.text,
				        "color":"#000",
				        "point_size": 14
				    },
		            "save": {
		                "image_identifier": req.query.id
		            }
		        }
		    ]
		});	

		blitline.postJobs(function(response) {
			console.log(nodeutil.inspect(response, { depth:10, colors: true }));
			setTimeout(function () {
				res.send('<img src="'+response.results[0].images[0].s3_url+'"/>');
			}, 1000);
			
		});		
	} else {
		res.send('Nope');
	}

	
}


module.exports = function (req, res) {
	createTwitterImage(req, res);
};