// Generated by CoffeeScript 1.6.2
(function() {
  var compile, http, pickup;

  http = require('http');

  compile = require('./compile.js');

  pickup = require('pickup');

  module.exports = function(item, callback) {
    var articles, parser, url;

    url = item.header.url;
    parser = pickup();
    articles = [];
    http.get(url, function(res) {
      return res.pipe(parser);
    });
    parser.on('entry', function(article) {
      return articles.push(article);
    });
    return parser.on('finish', function() {
      var jadeCompile, result;

      jadeCompile = compile(item);
      result = jadeCompile({
        articles: articles
      });
      return callback(null, result);
    });
  };

}).call(this);
