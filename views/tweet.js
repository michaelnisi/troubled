// Generated by CoffeeScript 1.6.2
(function() {
  var compile, qs, request, twitter;

  request = require('request');

  compile = require('./compile.js');

  twitter = require('twitter-text');

  qs = require('querystring');

  module.exports = function(item, callback) {
    var oauth, options, params, url;

    oauth = {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.ACCESS_TOKEN,
      token_secret: process.env.ACCESS_TOKEN_SECRET
    };
    params = {
      screen_name: item.header.screen_name,
      count: 1
    };
    url = item.header.url += qs.stringify(params);
    options = {
      url: url,
      oauth: oauth
    };
    return request(options, function(err, resp, body) {
      var jadeCompile, result, text, tweet, tweets;

      if (err != null) {
        return callback(err);
      }
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
