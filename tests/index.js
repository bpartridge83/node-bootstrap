/*globals casper, __utils__ */

'use strict';

casper.start('http://localhost:5000', function () {
  this.test.assertTitle('Title', 'Testing <title>');
  this.test.assertHttpStatus(200, 'The page returns a 200');
});

casper.run(function () {
  this.test.done();
  this.echo('Testing Complete');
});