(function() {
  var bake, blake, getLocals, jade, markdown;

  jade = require('jade');

  blake = require('blake');

  markdown = require('markdown').markdown;

  getLocals = function(srcOrFile, paths) {
    var name, src;
    if (paths != null) {
      src = blake.getSource(srcOrFile.content, srcOrFile.name, paths);
    } else {
      src = srcOrFile;
      name = src.name;
      src.link = name.substr(0, name.lastIndexOf('.')) || src.link;
    }
    return {
      title: src.header.title,
      description: src.header.description,
      content: markdown.toHTML(src.body),
      link: src.link,
      date: src.date,
      time: src.date.getTime(),
      dateString: src.dateString
    };
  };

  bake = function(src, callback) {
    var jadeCompile, options, result;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    jadeCompile = jade.compile(src.template, options);
    result = jadeCompile(getLocals(src));
    return callback(null, src, result);
  };

  module.exports = {
    bake: bake,
    getLocals: getLocals
  };

}).call(this);
