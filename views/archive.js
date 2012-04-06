(function() {
  var article, blake, compile, jade;

  jade = require('jade');

  blake = require('blake');

  article = require('./article.js');

  compile = function(src, items, callback) {
    var html, locals, options, toArchive;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    toArchive = jade.compile(src.template, options);
    locals = {
      title: src.header.title,
      items: items,
      dateString: items[0].dateString
    };
    html = toArchive(locals);
    return callback(null, html);
  };

  exports.bake = function(src, callback) {
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

}).call(this);
