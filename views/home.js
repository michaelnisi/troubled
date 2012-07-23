(function() {
  var archive, bake;

  archive = require('./archive.js');

  bake = function(item, callback) {
    return archive.bake(item, callback);
  };

  exports.bake = bake;

}).call(this);
