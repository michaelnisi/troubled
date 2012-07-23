(function() {
  var article, bake, compile, process;

  compile = require('./compile.js');

  article = require('./article.js');

  process = function(item, items, callback) {
    var hasItems, html, locals, threshold, toArchive;
    toArchive = compile(item);
    hasItems = (items != null) && items.length > 0;
    threshold = (items.length / 2) + 1;
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

  bake = function(item, callback) {
    return item.read(item.paths.posts, function(err, items) {
      var articles, it, _i, _len;
      if (err != null) return callback(err);
      articles = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        it = items[_i];
        articles.push(article.getLocals(it));
      }
      articles.sort(function(a, b) {
        return (a.time - b.time) * -1;
      });
      return process(item, articles, function(err, html) {
        return callback(err, html);
      });
    });
  };

  exports.bake = bake;

}).call(this);
