(function() {
  var bake, blake, compile, getLocals, markdown;

  compile = require('./compile.js');

  blake = require('blake');

  markdown = require('markdown').markdown;

  getLocals = function(item) {
    return {
      title: item.header.title,
      description: item.header.description,
      content: markdown.toHTML(item.body),
      link: item.link,
      date: item.date,
      time: item.date.getTime(),
      dateString: item.dateString
    };
  };

  bake = function(item, callback) {
    var jadeCompile, result;
    item.link = item.name.substr(0, item.name.lastIndexOf('.'));
    jadeCompile = compile(item);
    result = jadeCompile(getLocals(item));
    return callback(null, result);
  };

  module.exports = {
    bake: bake,
    getLocals: getLocals
  };

}).call(this);
