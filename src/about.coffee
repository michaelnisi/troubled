# about - generate about page

compile = require './compile.js'
{ markdown } = require 'markdown'

module.exports = (item, callback) ->
  jadeCompile = compile item

  result = jadeCompile
    title: item.header.title
    description: item.header.description
    content: markdown.toHTML item.body
    dateString: item.dateString

  callback null, result
