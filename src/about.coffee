compile = require './compile.js'
{ markdown } = require 'markdown'

bake = (item, callback) ->
  jadeCompile = compile item

  result = jadeCompile
    title: item.header.title
    description: item.header.description
    content: markdown.toHTML item.body
    dateString: item.dateString

  callback null, result

exports.bake = bake
