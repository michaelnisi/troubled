compile = require './compile.js'

module.exports = (item, items, shift = false, callback) ->
  toArchive = compile item 
  
  hasItems = items? and items.length > 0
  length = items.length
  
  if shift
    latestItem = items.shift()
  else 
    latestItem = null

  threshold = Math.ceil length / 2

  locals = 
    title: item.header.title
    items: items
    dateString: items[0].dateString
    hasItems: hasItems 
    latestItem: latestItem
    firstColumnItems: items.slice 0, threshold
    secondColumnItems: items.slice threshold 

  html = toArchive locals

  callback null, html
