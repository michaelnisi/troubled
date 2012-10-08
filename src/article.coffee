# article - generate article

compile = require './compile.js'
getLocals = require './getLocals.js'

module.exports = (item, callback) ->
  jadeCompile = compile item
  result = jadeCompile getLocals item

  callback null, result
