# article - generate article

compile = require './compile.js'
getLocals = require './getLocals.js'

module.exports = (item, cb) ->
  jadeCompile = compile item
  result = jadeCompile getLocals item
  cb null, result
