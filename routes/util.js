exports.amazonReply = function(res, msg, continueSession) {
	var ret = {
		"version": "1.0",
		"response": {
			"outputSpeech": {
				"type": "PlainText",
				"text": msg
			},
			"shouldEndSession": (!continueSession) ? true : false
		}
	};

	return res.json(ret);
};


