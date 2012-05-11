(function() {
  var article, bake, blake, compile, jade;

  jade = require('jade');

  blake = require('blake');

  article = require('./article.js');

  compile = function(src, items, callback) {
    var hasItems, html, locals, options, threshold, toArchive;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    toArchive = jade.compile(src.template, options);
    hasItems = (items != null) && items.length > 0;
    threshold = (items.length / 2) + 1;
    locals = {
      title: src.header.title,
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

  bake = function(src, callback) {
    return blake.readFiles(src.paths.posts, function(err, files) {
      var file, items, _i, _len;
      if (err) throw err;
      items = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        items.push(article.getLocals(file, src.paths));
      }
      items.sort(function(a, b) {
        return (a.time - b.time) * -1;
      });
      return compile(src, items, function(err, html) {
        return callback(err, src, html);
      });
    });
  };

  exports.bake = bake;

}).call(this);
