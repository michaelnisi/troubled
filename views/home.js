(function() {
  var getArticles, split;

  getArticles = require('./getArticles.js');

  split = require('./split.js');

  module.exports = function(item, callback) {
    return getArticles(item, -1, function(err, articles) {
      if (err != null) return callback(err);
      return split(item, articles, true, function(err, html) {
        return callback(err, html);
      });
    });
  };

}).call(this);
