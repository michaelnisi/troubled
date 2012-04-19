(function() {
  var bake, jade, request, twitter;

  request = require('request');

  jade = require('jade');

  twitter = require('twitter-text');

  bake = function(src, callback) {
    return request(src.header.url, function(err, resp, body) {
      var jadeCompile, options, result, text, tweet, tweets;
      if (err) return callback(err);
      tweets = JSON.parse(body);
      tweet = tweets[0];
      if (!(tweet && tweet.text)) return callback(new Error('No tweet'));
      text = twitter.autoLink(tweet.text);
      options = {
        filename: src.templatePath,
        pretty: true
      };
      jadeCompile = jade.compile(src.template, options);
      result = jadeCompile({
        text: text
      });
      return callback(null, src, result);
    });
  };

  exports.bake = bake;

}).call(this);
