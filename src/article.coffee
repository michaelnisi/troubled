compile = require './compile.js'
blake = require 'blake'
{ markdown } = require 'markdown'

getLocals = (item) ->
  title: item.header.title
  description: item.header.description
  content: markdown.toHTML item.body
  link: item.link
  date: item.date
  time: item.date.getTime()
  dateString: item.dateString

bake = (item, callback) ->
  # Override link on article page
  item.link = item.name.substr(0, item.name.lastIndexOf '.')
  
  jadeCompile = compile item
  result = jadeCompile getLocals item

  callback null, result

module.exports = 
  bake: bake
  getLocals: getLocals
