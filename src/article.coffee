compile = require './compile.js'
getLocals = require './getLocals.js'

module.exports = (item, callback) ->
  # Override link on article page
  item.link = item.name.substr(0, item.name.lastIndexOf '.')
  
  jadeCompile = compile item
  result = jadeCompile getLocals item

  callback null, result
