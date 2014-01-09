/* global app, fs, models */

'use strict';

module.exports = function () {

  app.io.route('ready', function (req) {

    var pjson = require(app.get('path') + '/../package.json');

    req.io.emit('status', {
      status: 'running',
      environment: app.get('env'),
      version: pjson.version
    });

  });

};