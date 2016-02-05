var express = require('express');
var async = require('async');
var needle = require('needle');
var router = express.Router();
var cpapi = require('couchpotato-api');
var config = require('../config.js');

var kkutil = require('./util.js');

var movies = {};
var sessions = {};


var couchpotato = new cpapi({
	hostname: config.couchpotato.hostname,
	apiKey: config.couchpotato.api_key,
	port: config.couchpotato.port
});

router.post('/', function(req, res, next) {
	var amznreq = req.body.request;

	var sessionId = req.body.session.sessionId;
	var intentName = req.body.request.intent.name;

	if (intentName == 'Add') {
		var srch = amznreq.intent.slots.Movie.value;

		couchpotato.get("search", {q: srch}).then(function (result) {
			sessions[sessionId] = result.movies;

			var movie = sessions[sessionId].shift();
			movies[sessionId] = movie;

			return kkutil.amazonReply(res, "Did you want to download " + movie.titles[0] + " made in " + movie.year + "?", true);
		}).catch(function (err) {
			return kkutil.amazonReply(res, "There was an error processing this request with couch potato", false);
		});
	}
	else if (intentName == 'YesDownload') {
		var movie = movies[sessionId];

		couchpotato.get('movie.add', { identifier: movie.imdb }).then(function(result) {
			kkutil.amazonReply(res, "Downloading " + movie.titles[0] + " like a boss", false);

			delete sessions[sessionId];
			delete movies[sessionId];
		}).catch(function (err) {
			return kkutil.amazonReply(res, "There was an error processing this request with couch potato", false);
		});
	}
	else if (intentName == 'NoDownload') {
		var movie = sessions[sessionId].shift();

		movies[sessionId] = movie;

		return kkutil.amazonReply(res, "Did you want to download " + movie.titles[0] + " made in " + movie.year + "?", true);
	}
});

module.exports = router;
