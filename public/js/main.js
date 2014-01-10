/**globals io, alert */

'use strict';

var io = io.connect();

io.on('status', function (res) {
  console.log(res);
});

io.on('connect', function () {
  console.log('io: Connected');
});

io.on('disconnect', function () {
  console.log('io: Disconnected');
});

io.on('awesome', function (res) {
  console.log(res);
});

io.emit('ready');