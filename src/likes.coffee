request = require 'request'
compile = require './compile.js'
FeedParser = require 'feedparser'

module.exports = (item, callback) ->
  parser = new FeedParser
  likes = request item.header.url
  articles = []

  likes.on 'error', (err) ->
    callback err

  parser.on 'article', (article) ->
    articles.push article

  parser.on 'end', () ->
    jadeCompile = compile item

    result = jadeCompile
      articles: articles

    callback null, result

  likes.pipe parser.stream
