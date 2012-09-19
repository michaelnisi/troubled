(function() {
  var compile, request, twitter;

  request = require('request');

  compile = require('./compile.js');

  twitter = require('twitter-text');

  module.exports = function(item, callback) {
    return request(item.header.url, function(err, resp, body) {
      var jadeCompile, result, text, tweet, tweets;
      if (err != null) return callback(err);
      tweets = JSON.parse(body);
      tweet = tweets[0];
      if (!((tweet != null) && (tweet.text != null))) {
        return callback(new Error('No tweet'));
      }
      text = twitter.autoLink(tweet.text, {
        urlEntities: tweet.entities.urls
      });
      jadeCompile = compile(item);
      result = jadeCompile({
        text: text
      });
      return callback(null, result);
    });
  };

}).call(this);
