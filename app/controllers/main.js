/* global app, fs, models */

'use strict';

module.exports = function () {

  app.get('/', function (req, res) {

    var cat = new Cat({
      name: 'Galore'
    });

    cat.save(function () {
      res.render('test');
    });

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