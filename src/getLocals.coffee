# getLocals - get jade template locals for item

{ markdown } = require 'markdown'

module.exports = (item) ->
  title: item.header.title
  description: item.header.description
  content: markdown.toHTML item.body
  name: item.name
  link: item.link
  date: item.date
  time: item.date.getTime()
  pubDate: item.pubDate
  dateString: item.dateString
