
# rss - bake RSS feed

compile = require './compile.js'
get_articles = require './getArticles.js'

module.exports = (item, cb) ->
  get_articles item, -1, (er, entries) ->
    return cb er if er?
    bake item, entries, (er, html) ->
      cb er, html

channel = (it, date) ->
  pubDate: date
  title: it.header.title
  href: it.header.link + it.header.name
  link: it.header.link
  description: it.header.description

entry = (a) ->
  title: a.title
  description: a.description
  content: ['<![CDATA[', a.content, ']>'].join ''
  link: a.link
  pubDate: a.pubDate

locals = (item, articles) ->
  channel: channel item, articles[0].pubDate
  entries: (entry a for a in articles)

bake = (item, articles, cb) ->
  fun = compile item
  res = fun locals item, articles
  cb null, res
