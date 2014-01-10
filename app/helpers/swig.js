/* global app, fs, vsprintf, sprintf, swig, _ */

'use strict';

module.exports = function () {

  var _find = function (name) {
    var found = null,
      formats = [
        '/vendor/%s/%s.js',
        '/vendor/%s/%s.min.js',
        '/vendor/%s/%s-min.js',
        '/vendor/%s/%s.css',
        '/vendor/%s/%s.min.css',
        '/vendor/%s/%s-min.css'
      ];

    _.each(formats, function (format) {
      format = vsprintf(format, [name, name]);
      if (fs.existsSync(app.get('public') + '/' + format)) {
        found = format;
      }
    });

    return found;
  };

  var vendor = function (input, idx) {

    var filePath = null;

    if (input.indexOf('.') > -1) {
      var format = sprintf('/vendor/%s', input);
      if (fs.existsSync(app.get('public') + '/' + format)) {
        filePath = format;
      }
    } else {
      filePath = _find(input);
    }

    if (filePath) {
      return sprintf('<script src="%s"></script>', filePath);
    }

    return '';
  };

  vendor.safe = true;
  swig.setFilter('vendor', vendor);

};