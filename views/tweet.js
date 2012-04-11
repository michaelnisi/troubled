(function() {
  var bake, jade, request, twitter;

  request = require('request');

  jade = require('jade');

  twitter = require('twitter-text');

  bake = function(src, callback) {
    return request(src.header.url, function(err, resp, body) {
      var jadeCompile, options, result, text, tweets;
      if (err) {
        return callback(err);
      } else {
        tweets = JSON.parse(body);
        text = twitter.autoLink(tweets[0].text);
        options = {
          filename: src.templatePath,
          pretty: true
        };
        jadeCompile = jade.compile(src.template, options);
        result = jadeCompile({
          text: text
        });
        return callback(null, src, result);
      }
    });
  };

  exports.bake = bake;

}).call(this);
