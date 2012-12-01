
# rss - generate RSS feed

compile = require './compile.js'
getArticles = require './getArticles.js'

process = (item, items, callback) ->
  rss = compile item 

  locals = 
    items: items
    channel:
      pubDate: items[0].pubDate
      title: item.header.title
      href: item.header.link + item.header.name
      link: item.header.link
      description: item.header.description

  result = rss locals

  callback null, result

module.exports = (item, callback) ->
  getArticles item, -1, (err, articles) ->
    return callback err if err?
    process item, articles, (err, html) ->
      callback err, html
