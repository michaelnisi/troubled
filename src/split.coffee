# split - split articles into two columns 

compile = require './compile.js'

module.exports = (item, items, shift = false, callback) ->
  toArchive = compile item 
  
  dateString = items[0].dateString
  latestItem = if shift then items.shift() else null
  hasItems = items.length > 0
  threshold = Math.ceil items.length / 2
  firstColumnItems = if hasItems then items.slice 0, threshold else null
  secondColumnItems = if hasItems then items.slice threshold else null
  
  locals = 
    title: item.header.title
    items: items
    dateString: dateString
    hasItems: hasItems 
    latestItem: latestItem
    firstColumnItems: firstColumnItems 
    secondColumnItems: secondColumnItems

  html = toArchive locals

  callback null, html
