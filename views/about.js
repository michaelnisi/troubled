(function() {
  var bake, jade, markdown;

  jade = require('jade');

  markdown = (require('markdown')).markdown;

  bake = function(src, callback) {
    var jadeCompile, options, result;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    jadeCompile = jade.compile(src.template, options);
    result = jadeCompile({
      mainNavigationItems: src.header.menu,
      title: src.header.title,
      description: src.header.description,
      content: markdown.toHTML(src.body),
      dateString: src.dateString
    });
    return callback(null, src.path, src.name, result);
  };

  module.exports = {
    bake: bake
  };

}).call(this);
