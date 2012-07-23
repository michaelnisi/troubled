(function() {
  var compile, jade;

  jade = require('jade');

  compile = function(item) {
    var options;
    options = {
      filename: item.templatePath,
      pretty: true
    };
    return jade.compile(item.template, options);
  };

  module.exports = compile;

}).call(this);
