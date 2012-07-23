(function() {
  var bake, compile, markdown;

  compile = require('./compile.js');

  markdown = require('markdown').markdown;

  bake = function(item, callback) {
    var jadeCompile, result;
    jadeCompile = compile(item);
    result = jadeCompile({
      title: item.header.title,
      description: item.header.description,
      content: markdown.toHTML(item.body),
      dateString: item.dateString
    });
    return callback(null, result);
  };

  exports.bake = bake;

}).call(this);
