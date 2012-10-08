(function() {
  var compile, getArticles, process;

  compile = require('./compile.js');

  getArticles = require('./getArticles.js');

  process = require('./process.js');

  module.exports = function(item, callback) {
    return getArticles(item, -1, function(err, articles) {
      if (err != null) return callback(err);
      return process(item, articles, false, function(err, html) {
        return callback(err, html);
      });
    });
  };

}).call(this);
