var express = require('express');
var async = require('async');
var needle = require('needle');
var url = require('url');
var router = express.Router();


var kkutil = require('./util.js');
var config = require('../config.js');

function kodiCall(method, params, id, callback) {
	var pl = {
		"jsonrpc": "2.0",
		"method": method,
		"id": id
	};

	if (params && Object.keys(params).length > 0) {
		pl.params = params;
	}

	var url = 'http://' + config.kodi.username + ':' + config.kodi.password + '@' + config.kodi.hostname + ':' + config.kodi.port + '/jsonrpc?request=' + encodeURIComponent(JSON.stringify(pl));

	var options = {
		headers: {'Content-type': 'application/json'}
	};

	needle.get(url, options, callback);
}

router.post('/', function(req, res, next) {
	if (req.body.request.intent && req.body.request.intent.name == 'GetRecentEpisodes') {
		var params = {
			"properties": ["title", "showtitle", "season", "episode"],
			"limits": {
				"end": 5
			}
		};

		return kodiCall("VideoLibrary.GetRecentlyAddedEpisodes", params, 1, function(err, response) {
			if (err) {
				return kkutil.amazonReply(res, "Could not speak with Kodi", false);
			}

			var msg;

			if (!response || !response.body || !response.body.result || !response.body.result.episodes || !response.body.result.episodes.length) {
				msg = "No recently added episodes found";
			}
			else
			{
				msg = "The following episodes have been added to your Kodi library recently, ";
				for (var i=0 ;i < 5 && i < response.body.result.episodes.length; i++) {
					var m = response.body.result.episodes[i].showtitle + " season " + response.body.result.episodes[i].season + " episode " + response.body.result.episodes[i].episode;

					msg += m + ", ";
				}

				return kkutil.amazonReply(res, msg, false);
			}
		});
	}
	else if (req.body.request.intent && req.body.request.intent.name == 'GetRecentMovies') {
		var params = {
			"limits": {
				"end": 5
			}
		};

		return kodiCall("VideoLibrary.GetRecentlyAddedMovies", params, 1, function(err, response) {
			if (err) {
				return kkutil.amazonReply(res, "Could not speak with Kodi", false);
			}

			var msg;

			if (!response || !response.body || !response.body.result || !response.body.result.movies || !response.body.result.movies.length) {
				msg = "No recently added movies found";
			}
			else
			{
				msg = "The following movies have been added to your Kodi library recently, ";
				for (var i=0 ;i < 5 && i < response.body.result.movies.length; i++) {
					var m = response.body.result.movies[i].label;

					msg += m + ", ";
				}

				return kkutil.amazonReply(res, msg, false);
			}
		});
	}

	var forPlay = false;

	if (req.body.request.intent && req.body.request.intent.name == 'Play')
		forPlay = true;

	var amznreq = req.body.request;

	if (amznreq.intent.slots && amznreq.intent.slots && amznreq.intent.slots.Video && amznreq.intent.slots.Video.value) { 
		var params = {
			"filter": {
				"field": "title", 
				"operator": "contains", 
				"value": amznreq.intent.slots.Video.value
			}, 
			"limits": { "start" : 0, "end": 5 }, 
			"properties" : ["art", "rating", "thumbnail", "playcount", "file"], 
			"sort": { "order": "ascending", "method": "label", "ignorearticle": true } 
		};

		return kodiCall("VideoLibrary.GetMovies", params, "libMovies", function(err, response) {
			if (err) {
				return kkutil.amazonReply(res, "Could not speak with Kodi", false);
			}

			if (!response || !response.body || !response.body.result || !response.body.result.movies || !response.body.result.movies.length) {
				return kkutil.amazonReply(res, "I could not find " + amznreq.intent.slots.Video.value + " in your movies collection.", false);
			}


			var params = {
				"item": {
					"movieid": response.body.result.movies[0].movieid
				},
				"options": {
					"resume": true
				}
			};

			return kodiCall("Player.Open", params, 1, function(err, response) {
				if (err) {
					return kkutil.amazonReply(res, "Could not speak with Kodi", false);
				}

				return kkutil.amazonReply(res, "Now playing, " + amznreq.intent.slots.Video.value + ", enjoy your fucking movie", false);
			});
		});
	}


	var playerIds = [];
	var speedByPlayerId = {};
	var wasChanged = false;

	async.series([
		function(cb) {
			return kodiCall("Player.GetActivePlayers", null, 1, function(err, response) {
				if (!response.body || !response.body.result || !response.body.result.length) {
					kkutil.amazonReply(res, "No active players found", false);
					return cb("no active players");
				}

				response.body.result.forEach(function(r) {
					playerIds.push(r.playerid);
				});

				return cb();
			});
		},
		function(cb) {
			async.eachSeries(playerIds, function(pid, cab) {
				var params = {
					"playerid": pid,
					"properties": ["speed"]
				};

				return kodiCall("Player.GetProperties", params, 1, function(err, response) {
					if (!response.body || !response.body.result) {
						kkutil.amazonReply(res, "Could not get player speed", false);
						return cab("no result");
					}

					var speed = response.body.result.speed;

					if ((speed === 0 && forPlay == false) || (forPlay == true && speed > 0)) {
						// Already paused dummy
						return cab();
					}
					else {
						wasChanged = true;

						return kodiCall("Player.PlayPause", { "playerid": pid }, 1, function(err, response) {
							return cab();
						});
					}
				});
			}, cb);
		}
	], function(err) { 
		return kkutil.amazonReply(res, ((wasChanged == true) ? "Yes, Master" : "It already is, dummy"), false);
	});
});

module.exports = router;
