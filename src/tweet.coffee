# This module bakes the latest tweet snippet.

# Require external dependencies.
request = require 'request'
jade = require 'jade'
twitter = require 'twitter-text'

# Request url. If request returns error, apply callback with error. Parse
# body as JSON and get first tweet. If there's no tweet or the tweet 
# contains no text return callback with error. Else apply jade compile with
# auto linked text of first tweet and apply callback with src and result.
bake = (src, callback) ->
  request src.header.url, (err, resp, body) ->
    return callback err if err
      
    tweets = JSON.parse body
    tweet = tweets[0]

    return callback new Error 'No tweet' unless tweet? and tweet.text?

    text = twitter.autoLink tweet.text

    options =
      filename: src.templatePath
      pretty: true
    
    jadeCompile = jade.compile src.template, options
    
    result = jadeCompile
      text: text

    callback null, src, result

# Export API.
exports.bake = bake
