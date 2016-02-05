var express = require('express');
var async = require('async');
var needle = require('needle');
var url = require('url');
var router = express.Router();
var moment = require('moment');

var sessions = {};
var shows = {};

var kkutil = require('./util.js');
var config = require('../config.js');

router.post('/', function(req, res, next) {
	var amznreq = req.body.request;

	var sessionId = req.body.session.sessionId;
	var intentName = req.body.request.intent.name;

	var baseUrl = 'http://' + config.sickrage.hostname + ':' + config.sickrage.port + '/api/' + config.sickrage.api_key + '/';

	if (intentName == 'Upcoming') {
		var url = baseUrl + "?cmd=future&sort=date&type=soon";

		needle.get(url, function(err, response) {
			if (err) {
				return kkutil.amazonReply(res, "There was an error speaking with SickRage", false);
			}

			var soon = response.body.data.soon;
			var msg = "The upcoming television shows for the next week are, ";

			var byDay = new Array(7);

			for (var i=0; i < soon.length; i++) {
				var m = soon[i].show_name + " season " + soon[i].season + " episode " + soon[i].episode + " on " + soon[i].airs.split(' ')[0] + " at " + soon[i].airs.split(' ')[1];

				msg += m + ", ";
			}

			return kkutil.amazonReply(res, msg, false);
		});
	}
	else if (intentName == 'Download') {
		var name = amznreq.intent.slots.ShowName.value;

		var url = baseUrl + "?cmd=sb.searchtvdb&name=" + encodeURIComponent(name);

		needle.get(url, function(err, response) {
			if (err) {
				return kkutil.amazonReply(res, "There was an error speaking with SickRage", false);
			}

			var rows = response.body.data.results;

			sessions[sessionId] = rows;

			var show = sessions[sessionId].shift();
			shows[sessionId] = show;

			var mom = new moment(show.first_aired);

			return kkutil.amazonReply(res, "Did you want to download " + show.name + " first aired in " + mom.format('MMMM') + " of " + mom.format('YYYY') + "?", true);
		});

	}
	else if (intentName == 'YesDownload') {
		var show = shows[sessionId];

		var url = baseUrl + "?cmd=show.addnew&indexerid=" + encodeURIComponent(show.indexer) + "&tvdbid=" + encodeURIComponent(show.tvdbid);
		needle.get(url, function(err, response) { 
			if (err) {
				return kkutil.amazonReply(res, "There was an error speaking with SickRage", false);
			}

			return kkutil.amazonReply(res, "Downloading " + show.name + " like a boss", false);
		});

		delete sessions[sessionId];
		delete shows[sessionId];
	}
	else if (intentName == 'NoDownload') {
		var show = sessions[sessionId].shift();

		shows[sessionId] = show;
		var mom = new moment(show.first_aired);

		return kkutil.amazonReply(res, "Did you want to download " + show.name + " first aired in " + mom.format('MMMM') + " of " + mom.format('YYYY') + "?", true);
	}
});

module.exports = router;
