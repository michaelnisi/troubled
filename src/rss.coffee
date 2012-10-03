compile = require './compile.js'
{ markdown } = require 'markdown'

process = (item, items, callback) ->
  rss = compile item 

  locals = 
    items: items
    channel: 
      date: item.dateString
      title: item.header.title
      link: item.header.link
      description: item.header.description

  result = rss locals

  callback null, result

module.exports = (item, callback) ->
  item.read item.paths.posts, (err, items) ->
    return callback err if err?

    items.sort (a, b) ->
      (a.time - b.time) * -1

    process item, items, (err, xml) ->
      callback err, xml
