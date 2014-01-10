/*globals nconf */

'use strict';

var express = require('express.io'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = http.createServer(app),
  io = app.http().io();

app.set('path', path.resolve('./app'));
app.set('public', path.resolve('./public'));
app.set('root', path.resolve('./'));

require(app.get('path') + '/index')(app, express, function (err, port) {

  if (err) { return err; }

  app.io.enable('browser client minification');
  app.io.enable('browser client etag');
  app.io.enable('browser client gzip');

  app.listen(port, function () {
    console.log('Listening on Port %s', port);
  });

});
