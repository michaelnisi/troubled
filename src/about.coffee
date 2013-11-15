
# about - generate about page

compile = require './compile.js'
{ markdown } = require 'markdown'

module.exports = (item, cb) ->
  fun = compile item
  result = fun
    title: item.header.title
    description: item.header.description
    content: markdown.toHTML item.body
    dateString: item.dateString
  cb null, result
