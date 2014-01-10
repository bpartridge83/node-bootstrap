/*globals app, fs, vsprintf, sprintf, swig */

'use strict';

module.exports = function () {

  var vendor = function (input, idx) {
    var filePath = vsprintf('vendor/%s/%s.js', [input, input]),
      filePathMin = filePath.replace('.js', '.min.js');

    if (fs.existsSync(app.get('public') + '/' + filePath)) {

      if (fs.existsSync(app.get('public') + '/' + filePathMin)) {
        filePath = filePathMin;
      }

      filePathMin = filePath.replace('.js', '-min.js');

      if (fs.existsSync(app.get('public') + '/' + filePathMin)) {
        filePath = filePathMin;
      }

      return sprintf('<script src="%s"></script>', filePath);
    }

    return '';
  };

  vendor.safe = true;
  swig.setFilter('vendor', vendor);

};