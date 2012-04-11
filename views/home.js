(function() {
  var archive, bake, blake, jade;

  jade = require('jade');

  blake = require('blake');

  archive = require('./archive.js');

  bake = function(src, callback) {
    return archive.bake(src, callback);
  };

  exports.bake = bake;

}).call(this);
