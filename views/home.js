(function() {
  var article, bake, blake, compile, getItem, jade;

  jade = require('jade');

  blake = require('blake');

  article = require('./article.js');

  getItem = function(file, paths) {
    var locals, src;
    src = blake.getSource(file.content, file.name, paths);
    return locals = article.getJadeLocals(src);
  };

  compile = function(src, items, callback) {
    var home, locals, options, result;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    home = jade.compile(src.template, options);
    locals = {
      mainNavigationItems: src.header.menu,
      title: src.header.title,
      items: items,
      dateString: items[0].dateString
    };
    result = home(locals);
    return callback(null, result);
  };

  bake = function(src, callback) {
    return blake.readFiles(src.paths.posts, function(err, files) {
      var file, items, _i, _len;
      if (err) throw err;
      items = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        items.push(getItem(file, src.paths));
      }
      items.sort(function(a, b) {
        return (a.time - b.time) * -1;
      });
      return compile(src, items.slice(0, 6), function(err, html) {
        return callback(null, src.path, src.name, html);
      });
    });
  };

  module.exports = {
    bake: bake
  };

}).call(this);
