(function() {
  var archive, blake, jade;

  jade = require('jade');

  blake = require('blake');

  archive = require('./archive.js');

  exports.bake = function(src, callback) {
    return archive.bake(src, callback);
  };

}).call(this);
