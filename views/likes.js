(function() {
  var FeedParser, bake, compile, request;

  request = require('request');

  compile = require('./compile.js');

  FeedParser = require('feedparser');

  bake = function(item, callback) {
    var articles, likes, parser;
    parser = new FeedParser;
    likes = request(item.header.url);
    articles = [];
    likes.on('error', function(err) {
      return callback(err);
    });
    parser.on('article', function(article) {
      return articles.push(article);
    });
    parser.on('end', function() {
      var jadeCompile, result;
      jadeCompile = compile(item);
      result = jadeCompile({
        articles: articles
      });
      return callback(null, result);
    });
    return likes.pipe(parser.stream);
  };

  exports.bake = bake;

}).call(this);
