/* global app, fs, models */

'use strict';

module.exports = function () {

  app.io.route('ready', function (req) {

    var pjson = require(app.get('path') + '/../package.json');

    setTimeout(function () {

      app.get('socket')(req).emit('status', 'io: Single-Client Message');
      app.io.broadcast('status', 'io: Application-Wide Broadcast');

      req.io.emit('status', {
        status: 'running',
        environment: app.get('env'),
        version: pjson.version
      });

    }, 1000);

  });

};