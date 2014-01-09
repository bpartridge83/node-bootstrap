/**globals io, alert */

'use strict';

var io = io.connect();

io.on('status', function (res) {
  console.log(res);
});

io.emit('ready');