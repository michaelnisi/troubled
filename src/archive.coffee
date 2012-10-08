compile = require './compile.js'
getArticles = require './getArticles.js'

process = (item, items, callback) ->
  toArchive = compile item 
  
  hasItems = items? and items.length > 0
  threshold = Math.ceil items.length / 2 + 1

  locals = 
    title: item.header.title
    items: items
    dateString: items[0].dateString
    hasItems: hasItems 
    latestItem: if hasItems then items[0] else null
    firstColumnItems: items.slice 0, threshold
    secondColumnItems: items.slice threshold 

  html = toArchive locals

  callback null, html

module.exports = (item, callback) ->
  getArticles item, -1, (err, articles) ->
    return callback err if err?
    process item, articles, (err, html) ->
      callback err, html
