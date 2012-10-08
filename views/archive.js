(function() {
  var compile, getArticles, process;

  compile = require('./compile.js');

  getArticles = require('./getArticles.js');

  process = function(item, items, callback) {
    var hasItems, html, locals, threshold, toArchive;
    toArchive = compile(item);
    hasItems = (items != null) && items.length > 0;
    threshold = Math.ceil(items.length / 2 + 1);
    locals = {
      title: item.header.title,
      items: items,
      dateString: items[0].dateString,
      hasItems: hasItems,
      latestItem: hasItems ? items[0] : null,
      firstColumnItems: items.slice(0, threshold),
      secondColumnItems: items.slice(threshold)
    };
    html = toArchive(locals);
    return callback(null, html);
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
