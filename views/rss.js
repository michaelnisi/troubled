(function() {
  var addItem, addItems, bake, blake, compile, getItem, jade, markdown, readDir;

  jade = require('jade');

  blake = require('blake');

  markdown = (require('markdown')).markdown;

  getItem = function(file, filename, paths) {
    var src;
    src = blake.getSource(file, filename, paths);
    if (src == null) return;
    return {
      title: src.header.title,
      description: src.header.description,
      content: "<h4>" + src.header.description + "</h4>" + (markdown.toHTML(src.body)),
      link: src.link,
      date: src.dateString
    };
  };

  addItem = function(name, paths, items, callback) {
    return blake.readFile(name, function(err, data) {
      var item;
      if (err) throw err;
      item = getItem(data, name, paths);
      items.push(item);
      return callback(err, items);
    });
  };

  readDir = function(path, callback) {
    return blake.readDir(path, callback);
  };

  addItems = function(paths, names, items, callback) {
    var name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      _results.push(addItem(name, paths, items, function(err, items) {
        if (items.length === names.length) return callback(null, items);
      }));
    }
    return _results;
  };

  compile = function(src, items, callback) {
    var options, result, rss, rssOptions;
    rssOptions = {
      filename: src.templatePath,
      pretty: true
    };
    rss = jade.compile(src.template, rssOptions);
    options = {
      items: items,
      channel: {
        date: src.dateString,
        title: src.header.title,
        description: src.header.description
      }
    };
    result = rss(options);
    return callback(null, src.path, src.name, result);
  };

  bake = function(src, callback) {
    var posts;
    posts = [];
    return readDir(src.paths.posts, function(err, names) {
      if (err) throw err;
      return addItems(src.paths, names, posts, function(err, posts) {
        return compile(src, posts, callback);
      });
    });
  };

  module.exports = {
    bake: bake,
    getItem: getItem
  };

}).call(this);
