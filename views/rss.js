(function() {
  var blake, compile, getItem, jade, markdown;

  jade = require('jade');

  blake = require('blake');

  markdown = require('markdown').markdown;

  getItem = function(file, paths) {
    var src;
    src = blake.getSource(file.content, file.name, paths);
    return {
      title: src.header.title,
      description: src.header.description,
      content: "<h4>" + src.header.description + "</h4>" + (markdown.toHTML(src.body)),
      link: src.link,
      date: src.dateString,
      time: src.date.getTime()
    };
  };

  compile = function(src, items, callback) {
    var locals, options, result, rss;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    rss = jade.compile(src.template, options);
    locals = {
      items: items,
      channel: {
        date: src.dateString,
        title: src.header.title,
        link: src.header.link,
        description: src.header.description
      }
    };
    result = rss(locals);
    return callback(null, result);
  };

  exports.bake = function(src, callback) {
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
      return compile(src, items, function(err, xml) {
        return callback(err, src, xml);
      });
    });
  };

}).call(this);
