(function() {
  var compile, getArticles, process;

  compile = require('./compile.js');

  getArticles = require('./getArticles.js');

  process = function(item, items, callback) {
    var locals, result, rss;
    rss = compile(item);
    locals = {
      items: items,
      channel: {
        pubDate: item.pubDate,
        title: item.header.title,
        href: item.header.link + item.header.name,
        link: item.header.link,
        description: item.header.description
      }
    };
    result = rss(locals);
    return callback(null, result);
  };

  module.exports = function(item, callback) {
    return getArticles(item, -1, function(err, articles) {
      if (err != null) return callback(err);
      return process(item, articles, function(err, html) {
        return callback(err, html);
      });
    });
  };

}).call(this);
