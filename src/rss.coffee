
# rss - generate RSS feed

compile = require './compile.js'
get_entries = require './getArticles.js'
assert = require 'assert'

module.exports = (item, cb) ->
  get_entries item, -1, (er, entries) ->
    return cb er if er?
    process item, entries, (er, html) ->
      cb er, html

fm = (entry) ->
  entry.content = ['<![CDATA[', entry.content, ']>'].join ''
  entry
      
process = (item, entries, cb) ->
  
  pubDate = entries[0].pubDate
  locals = 
    channel:
      pubDate: pubDate
      title: item.header.title
      href: item.header.link + item.header.name
      link: item.header.link
      description: item.header.description
    entries:
      (fm entry for entry in entries)

  c = compile item 
  res = c locals
  assert(!locals.items)
  cb null, res
