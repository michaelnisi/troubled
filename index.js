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

var Highlights = require('highlights')
var clean = require('property-ttl')
var https = require('https')
var jade = require('jade')
var markdown = require('markdown-it')
var pickBy = require('lodash.pickby')
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
    if (er) {
      return cb(er)
    }
    var json
    try {
      json = JSON.parse(body)
    } catch (ex) {
      return cb(ex)
    }
    if (json.errors instanceof Array) {
      var first = json.errors[0]
      var jsonError = new Error(first.message)
      jsonError.code = first.code
      return cb(jsonError)
    }
    if (!(json instanceof Array)) {
      return cb(new Error('unexpected data: ' + json))
    }
    var tweet = json[0]
    if (!((tweet != null) && (tweet.text != null))) {
      var tweetError = new Error('no tweet')
      return cb(tweetError)
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

function cleanup (grammars) {
  var managed = 0
  var stops = []
  scan()
  return function stopAll () {
    while (stops.length) stops.shift()()
  }
  function scan () {
    while (managed < grammars.length - 1) {
      stops.push(
        clean(grammars[managed], 'repository', 2000, function () {
          scan() // start watching new grammars if they are added later.
        }),
        clean(grammars[managed++], 'initialRule', 2000)
      )
    }
  }
}

var hl = new Highlights()
cleanup(hl.registry.grammars)

var languages = [
  'language-erlang',
  'language-swift'
]

languages.forEach(function (language) {
  hl.requireGrammarsSync({
    modulePath: require.resolve(language + '/package.json')
  })
})

var mappings = {
  sh: 'source.shell',
  markdown: 'source.gfm',
  erb: 'text.html.erb'
}

function scopeNameFromLang (highlighter, lang) {
  if (mappings[lang]) return mappings[lang]
  var grammar = pickBy(hl.registry.grammarsByScopeName, function (val, key) {
    return val.name.toLowerCase() === lang
  })
  if (Object.keys(grammar).length) {
    return Object.keys(grammar)[0]
  }
  var name = 'source.' + lang
  mappings[lang] = name
  return name
}

var md = markdown({
  highlight: function (str, lang) {
    var scope = scopeNameFromLang(hl, lang)
    return hl.highlightSync({
      fileContents: str,
      scopeName: scope
    })
  }
})

function localsWithItem (item) {
  return {
    title: item.header.title,
    description: item.header.description,
    content: md.render(item.body),
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
