(function() {
  var bake, getJadeLocals, jade, markdown;

  jade = require('jade');

  markdown = (require('markdown')).markdown;

  getJadeLocals = function(src) {
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
    result = jadeCompile(getJadeLocals(src));
    return callback(null, src.path, src.name, result);
  };

  module.exports = {
    bake: bake,
    getJadeLocals: getJadeLocals
  };

}).call(this);
