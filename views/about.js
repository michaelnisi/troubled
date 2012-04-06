(function() {
  var jade, markdown;

  jade = require('jade');

  markdown = require('markdown').markdown;

  exports.bake = function(src, callback) {
    var jadeCompile, options, result;
    options = {
      filename: src.templatePath,
      pretty: true
    };
    jadeCompile = jade.compile(src.template, options);
    result = jadeCompile({
      title: src.header.title,
      description: src.header.description,
      content: markdown.toHTML(src.body),
      dateString: src.dateString
    });
    return callback(null, src, result);
  };

}).call(this);
