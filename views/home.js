(function() {
  var archive;

  archive = require('./archive.js');

  module.exports = function(item, callback) {
    return archive(item, callback);
  };

}).call(this);
