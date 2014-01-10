/* global app, fs, models */

'use strict';

module.exports = function () {

  app.get('/', function (req, res) {

    return res.render('index');

  });

  app.get('/clients', function (req, res) {

    console.log(app.io);

  });
    
  app.get('/status', function (req, res) {
    
    var pjson = require('./package.json');
    
    return res.send({
      status: 'running',
      environment: app.get('site'),
      version: pjson.version
    });
    
  });

};