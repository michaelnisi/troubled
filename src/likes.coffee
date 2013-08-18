
# likes - generate likes snippet from instapaper likes

http = require 'http'
compile = require './compile.js'
pickup = require 'pickup'

module.exports = (item, callback) ->
  url = item.header.url
  parser = pickup()
  articles = []
  
  http.get url, (res) ->
    res.pipe parser
  
  parser.on 'entry', (article) ->
    articles.push article

  parser.on 'finish', () ->
    jadeCompile = compile item

    result = jadeCompile
      articles: articles

    callback null, result
