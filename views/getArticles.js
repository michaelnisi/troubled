(function() {
  var getLocals;

  getLocals = require('./getLocals.js');

  module.exports = function(item, direction, callback) {
    return item.read(item.paths.posts, function(err, items) {
      var articles, it, _i, _len;
      if (err != null) return callback(err);
      articles = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        it = items[_i];
        articles.push(getLocals(it));
      }
      articles.sort(function(a, b) {
        return (a.time - b.time) * direction;
      });
      return callback(err, articles);
    });
  };

}).call(this);
