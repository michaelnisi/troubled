# This module bakes the latest tweet snippet.

# Require external dependencies.
request = require 'request'
jade = require 'jade'
twitter = require 'twitter-text'

# Request url and parse body as JSON. If request returns error, apply
# callback with error. Otherwise apply jade compile with auto linked
# text of first tweet and apply callback.
bake = (src, callback) ->
  request src.header.url, (err, resp, body) ->
    if err
      callback err
    else
      tweets = JSON.parse body
      text = twitter.autoLink tweets[0].text

      options =
        filename: src.templatePath
        pretty: true
      
      jadeCompile = jade.compile src.template, options
      
      result = jadeCompile
        text: text

      callback null, src, result

# Exports API.
exports.bake = bake
