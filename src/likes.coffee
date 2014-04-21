
# likes - generate likes snippet from instapaper likes

https = require 'https'
compile = require './compile.js'
pickup = require 'pickup'

module.exports = (item, cb) ->
  url = item.header.url
  parser = pickup()
  articles = []
  
  https.get url, (res) ->
    res.pipe parser

  parser.on 'error', (er) ->
    cb er
  
  parser.on 'entry', (article) ->
    articles.push article

  parser.on 'finish', () ->
    jadeCompile = compile item

    result = jadeCompile
      articles: articles

    cb null, result
