
// rss - generate feed

function channel (it, date) {
  return {
    pubDate: date,
    title: it.header.title,
    href: it.header.link + it.header.name,
    link: it.header.link,
    description: it.header.description
  }
}

function entry (a) {
  return {
    title: a.title,
    description: a.description,
    content: ['<![CDATA[', a.content, ']>'].join(''),
    link: a.link,
    pubDate: a.pubDate
  }
}

function entries (articles) {
  var entries = []
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

var compile = require('./compile')
function bake (item, articles, cb) {
  var res = compile(item)(locals(item, articles))
  return cb(null, res)
}

var articles = require('./getArticles')
module.exports = function(item, cb) {
  return articles(item, -1, function(er, entries) {
    if (er) return cb(er)
    return bake(item, entries, function(er, html) {
      return cb(er, html)
    })
  })
}
