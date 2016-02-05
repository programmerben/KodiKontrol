var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var kodi = require('./routes/kodi');
var couchpotato = require('./routes/couchpotato');
var sickrage = require('./routes/sickrage');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Our 3 routes
app.use('/kodi', kodi);
app.use('/couchpotato', couchpotato);
app.use('/sickrage', sickrage);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
	res.status(500).send("I don't care");
});

process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = app;

