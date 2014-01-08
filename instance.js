/*globals nconf, APP_PATH */

'use strict';

var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = http.createServer(app),
  cluster = require('cluster');

global.APP_PATH = path.resolve('./app');

require(APP_PATH + '/index')(app, express, function (err, port) {

  if (err) {
    return err;
  }

  server.listen(port, function () {
    if (cluster.isWorker) {
      console.log('Listening on Port %s, Process ID %s', port, cluster.worker.id);
    } else {
      console.log('Listening on Port %s', port);
    }
  });

});
