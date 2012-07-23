(function() {
  var bake, compile, getItem, markdown, process;

  compile = require('./compile.js');

  markdown = require('markdown').markdown;

  getItem = function(file, paths) {
    var item;
    item = blake.getSource(file.content, file.name, paths);
    return {
      title: item.header.title,
      description: item.header.description,
      content: "<h4>" + item.header.description + "</h4>" + (markdown.toHTML(item.body)),
      link: item.link,
      date: item.dateString,
      time: item.date.getTime()
    };
  };

  process = function(item, items, callback) {
    var locals, result, rss;
    rss = compile(item);
    locals = {
      items: items,
      channel: {
        date: item.dateString,
        title: item.header.title,
        link: item.header.link,
        description: item.header.description
      }
    };
    result = rss(locals);
    return callback(null, result);
  };

  bake = function(item, callback) {
    return item.read(item.paths.posts, function(err, items) {
      if (err != null) return callback(err);
      items.sort(function(a, b) {
        return (a.time - b.time) * -1;
      });
      return process(item, items, function(err, xml) {
        return callback(err, xml);
      });
    });
  };

  exports.bake = bake;

}).call(this);
