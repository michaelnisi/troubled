compile = require './compile.js'
article = require './article.js'

process = (item, items, callback) ->
  toArchive = compile item 
  
  hasItems = items? and items.length > 0
  threshold = (items.length / 2) + 1

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

bake = (item, callback) ->
  item.read item.paths.posts, (err, items) ->
    return callback err if err?
    
    articles = []
    articles.push article.getLocals it for it in items

    articles.sort (a, b) ->
      (a.time - b.time)* -1
    
    process item, articles, (err, html) ->
      callback err, html

exports.bake = bake
