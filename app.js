var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var debug = require('debug')('honeybookapp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 3030);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use rails naming conventions to alias first- and third-party assets
app.use('/vendor/assets/javascripts', express.static(path.join(__dirname, 'node_modules')));
app.use('/vendor/assets/javascripts', express.static(path.join(__dirname, 'app', 'assets', 'javascripts', 'vendor')));
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets', 'images')));
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets', 'javascripts')));
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets', 'stylesheets')));
app.use('/fonts', express.static(path.join(__dirname, 'app', 'assets', 'stylesheets', 'fonts')));
app.use('/views', express.static(path.join(__dirname, 'app', 'views')));

app.use(express.static(path.join(__dirname, 'app')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});