/*global _, Async, nconf */

'use strict';

module.exports = function (app, express, done) {

  var swig = require('swig'),
    mongoose = require('mongoose'),
    controllers = require('./controllers'),
    models = require('./models');

  global._ = require('underscore');
  global.app = app;
  global.Async = require('async');
  global.fs = require('fs');
  global.nconf = require('nconf')
    .argv().env()
    .file('local', 'config.json');
  global.mongoose = mongoose.connect(nconf.get('MONGODB_URL'));

  app.configure(function () {

    app.use(express.static('./public'));

    app.use(express.compress());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser());
    app.use(express.logger('dev'));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.set('view cache', false);

  });

  Async.series([
    function (callback) {
      models();
      callback(null);
    },
    function (callback) {
      controllers();
      callback(null);
    }
  ], function (err) {
    done(null, nconf.get('PORT'));
  });

};