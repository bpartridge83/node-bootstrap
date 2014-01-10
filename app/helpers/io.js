/* global app */

'use strict';

module.exports = function () {

  app.set('socket', function (req) {
    return app.io.sockets.socket(req.io.socket.id);
  });

};