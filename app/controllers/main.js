/* global app, fs, models */

'use strict';

module.exports = function () {

  app.get('/', function (req, res) {

    res.render('index');

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