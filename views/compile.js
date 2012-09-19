(function() {
  var jade;

  jade = require('jade');

  module.exports = function(item) {
    var options;
    options = {
      filename: item.templatePath,
      pretty: true
    };
    return jade.compile(item.template, options);
  };

}).call(this);
