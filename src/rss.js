
// rss - generate feed

var articles = require('./getArticles')
  , compile = require('./compile')
  ;

function channel (it, date) {
  return {
    pubDate: date,
    title: it.header.title,
    href: it.header.link + it.header.name,
    link: it.header.link,
    description: it.header.description
  }
}

function Entry (title, description, content, link, pubDate) {
  this.title = title
  this.description = description
  this.content = content
  this.link = link
  this.pubDate = pubDate
}

function cdata (str) {
  return '<![CDATA[' + str + ']]>'
}

function entry (a) {
  return new Entry(
    a.title
  , a.description
  , cdata(a.content)
  , a.link
  , a.pubDate
  )
}

function entries (articles) {
  var entries = []
  // TODO: At some point we need a limit here
  articles.forEach(function (article) {
    entries.push(entry(article))
  })
  return entries
}

function locals (item, articles) {
  return {
    channel: channel(item, articles[0].pubDate),
    entries: entries(articles)
  }
}

function bake (item, articles, cb) {
  var res = compile(item)(locals(item, articles))
  return cb(null, res)
}

module.exports = function (item, cb) {
  return articles(item, -1, function(er, entries) {
    if (er) return cb(er)
    return bake(item, entries, function(er, html) {
      return cb(er, html)
    })
  })
}
