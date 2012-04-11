(function() {
  var FeedParser, bake, jade, request;

  request = require('request');

  jade = require('jade');

  FeedParser = require('feedparser');

  bake = function(src, callback) {
    var articles, likes, parser;
    parser = new FeedParser;
    likes = request(src.header.url);
    articles = [];
    likes.on('error', function(err) {
      return callback(err);
    });
    parser.on('article', function(article) {
      return articles.push(article);
    });
    parser.on('end', function() {
      var jadeCompile, options, result;
      options = {
        filename: src.templatePath,
        pretty: true
      };
      jadeCompile = jade.compile(src.template, options);
      result = jadeCompile({
        articles: articles
      });
      return callback(null, src, result);
    });
    return likes.pipe(parser.stream);
  };

  exports.bake = bake;

}).call(this);
