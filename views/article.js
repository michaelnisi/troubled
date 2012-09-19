(function() {
  var compile, getLocals;

  compile = require('./compile.js');

  getLocals = require('./getLocals.js');

  module.exports = function(item, callback) {
    var jadeCompile, result;
    item.link = item.name.substr(0, item.name.lastIndexOf('.'));
    jadeCompile = compile(item);
    result = jadeCompile(getLocals(item));
    return callback(null, result);
  };

}).call(this);
