// blake - blake file to generate my site

exports.paths = {
  data: 'data',
  templates: 'templates',
  resources: 'resources',
  posts: 'data/posts'
}

exports.views = {
  'rss.jade': rss,
  'article.jade': article,
  'home.jade': home,
  'about.jade': article,
  'error.jade': article,
  'archive.jade': archive,
  'likes.jade': likes,
  'tweet.jade': tweet
}

var https = require('https')
var jade = require('jade')
var marked = require('marked')
var pickup = require('pickup')
var qs = require('querystring')
var request = require('request')
var strftime = require('prettydate').strftime
var twitter = require('twitter-text')

function compile (item) {
  var opts = {
    filename: item.templatePath,
    cache: true
  }
  return jade.compile(item.template, opts)
}

function oauth (env) {
  return {
    consumer_key: env.CONSUMER_KEY,
    consumer_secret: env.CONSUMER_SECRET,
    token: env.ACCESS_TOKEN,
    token_secret: env.ACCESS_TOKEN_SECRET
  }
}

function latestTweet (body) {
  var tweets = JSON.parse(body)
  return tweets[0]
}

function tweet (item, cb) {
  var header = item.header
  var url = header.url
  var params = {
    screen_name: header.screen_name,
    count: 1
  }
  var opts = {
    url: url += qs.stringify(params),
    oauth: oauth(process.env)
  }
  request(opts, function (er, res, body) {
    if (er) return cb(er)
    var tweet = latestTweet(body)
    if (!((tweet != null) && (tweet.text != null))) {
      return cb(new Error('troubled: no tweet'))
    }
    var text = twitter.autoLink(tweet.text, {
      urlEntities: tweet.entities.urls
    })
    var result = compile(item)({ text: text })
    return cb(null, result)
  })
}

function splitLocals (item, items, shift) {
  var latestItem = shift ? items.shift() : null
  var threshold = Math.ceil(items.length / 2)
  var hasItems = items.length > 0
  var firstColumnItems = hasItems ? items.slice(0, threshold) : null
  var secondColumnItems = hasItems ? items.slice(threshold) : null

  var locals = localsWithItem(item)
  locals.items = items
  locals.hasItems = hasItems
  locals.latestItem = latestItem
  locals.firstColumnItems = firstColumnItems
  locals.secondColumnItems = secondColumnItems
  return locals
}

function split (item, items, shift, cb) {
  var html = compile(item)(splitLocals(item, items, !!shift))
  cb(null, html)
}

function likes (item, cb) {
  var url = item.header.url
  var parser = pickup({ eventMode: true })
  var articles = []
  https.get(url, function (res) {
    res.pipe(parser)
  })
  parser.on('error', function (er) {
    cb(er)
  })
  parser.on('entry', function (article) {
    articles.push(article)
  })
  parser.on('finish', function () {
    var result = compile(item)({
      articles: articles
    })
    cb(null, result)
  })
}

function channel (item, articles) {
  return {
    pubDate: articles[0].pubDate,
    lastBuildDate: new Date().toUTCString(),
    title: item.header.title,
    href: item.header.link + item.header.name,
    link: item.header.link,
    description: item.header.description
  }
}

function localsWithItem (item) {
  return {
    title: item.header.title,
    description: item.header.description,
    content: marked(item.body),
    name: item.name,
    link: item.link,
    date: item.date,
    dateString: strftime(item.date, '%d %B %Y'),
    pubDate: item.date.toUTCString(),
    icons: item.header.icons
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
    a.title,
    a.description,
    cdata(a.content),
    a.link,
    a.pubDate
  )
}

function posts (item, direction, cb) {
  item.read(item.paths.posts, function (er, items) {
    if (er) return cb(er)
    var articles = items.map(localsWithItem)
    articles.sort(function (a, b) {
      return (a.date - b.date) * direction
    })
    return cb(er, articles)
  })
}

function rss (item, cb) {
  posts(item, -1, function (er, articles) {
    if (er) return cb(er)
    var locals = {
      channel: channel(item, articles),
      entries: articles.map(entry)
    }
    var xml = compile(item)(locals)
    return cb(null, xml)
  })
}

function article (item, cb) {
  var locals = localsWithItem(item)
  var html = compile(item)(locals)
  cb(null, html)
}

function home (item, cb) {
  posts(item, -1, function (er, articles) {
    if (er) return cb(er)
    split(item, articles.slice(0, 5), true, function (er, html) {
      cb(er, html)
    })
  })
}

function archive (item, cb) {
  posts(item, -1, function (er, articles) {
    if (er) return cb(er)
    split(item, articles, false, function (er, html) {
      cb(er, html)
    })
  })
}

if (module === require.main) {
  console.log(exports)
  process.exit(0)
}
