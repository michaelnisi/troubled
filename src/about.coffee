
# about - generate about page

compile = require './compile.js'
{ markdown } = require 'markdown'

module.exports = (item, cb) ->
  result = compile item
    title: item.header.title
    description: item.header.description
    content: markdown.toHTML item.body
    dateString: item.dateString
    icons: item.header.icons
  cb null, result
