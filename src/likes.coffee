# This module bakes the likes snippet.

# Require external dependencies.
request = require 'request'
jade = require 'jade'
FeedParser = require 'feedparser'

# Initialize feed parser, likes request and articles array. Pipe likes 
# request to feed parser and apply callback. If something goes wrong
# apply callback with error.
bake = (src, callback) ->
  parser = new FeedParser
  likes = request src.header.url
  articles = []
 
  likes.on 'error', (err) ->
    callback err

  parser.on 'article', (article) ->
    articles.push article
  
  parser.on 'end', () ->
    options = 
      filename: src.templatePath
      pretty: true

    jadeCompile = jade.compile src.template, options

    result = jadeCompile
      articles: articles

    callback null, src, result
  
  likes.pipe parser.stream

# Export API.
exports.bake = bake
