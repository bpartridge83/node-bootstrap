/*globals nconf */

'use strict';

var express = require('express.io'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = http.createServer(app),
  cluster = require('cluster');

app.http().io();
app.set('path', path.resolve('./app'));

require(app.get('path') + '/index')(app, express, function (err, port) {

  if (err) {
    return err;
  }

  app.listen(port, function () {
    if (cluster.isWorker) {
      console.log('Listening on Port %s, Process ID %s', port, cluster.worker.id);
    } else {
      console.log('Listening on Port %s', port);
    }
  });

});
