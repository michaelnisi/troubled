'use strict'

// blake - blake file to generate my site

exports.paths = {
  data: 'data',
  templates: 'templates',
  resources: 'resources',
  posts: 'data/posts'
}

exports.views = {
  'rss.pug': rss,
  'article.pug': article,
  'home.pug': home,
  'about.pug': article,
  'error.pug': article,
  'archive.pug': archive,
  'likes.pug': likes,
  'tweet.pug': tweet
}

const Highlights = require('highlights')
const clean = require('property-ttl')
const https = require('https')
const markdown = require('markdown-it')
const pickBy = require('lodash.pickby')
const pickup = require('pickup')
const pug = require('pug')
const qs = require('querystring')
const request = require('request')
const strftime = require('prettydate').strftime
const twitter = require('twitter-text')

function compile (item) {
  const opts = {
    filename: item.templatePath,
    cache: true
  }
  const f = pug.compile(item.template, opts)
  return f
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
  const header = item.header
  let url = header.url
  const params = {
    screen_name: header.screen_name,
    count: 1
  }
  const opts = {
    url: url += qs.stringify(params),
    oauth: oauth(process.env)
  }
  request(opts, function onRequest (er, res, body) {
    if (er) {
      return cb(er)
    }
    let json
    try {
      json = JSON.parse(body)
    } catch (ex) {
      return cb(ex)
    }
    if (json.errors instanceof Array) {
      const first = json.errors[0]
      const jsonError = new Error(first.message)
      jsonError.code = first.code
      return cb(jsonError)
    }
    if (!(json instanceof Array)) {
      return cb(new Error('unexpected data: ' + json))
    }
    const tweet = json[0]
    if (!((tweet != null) && (tweet.text != null))) {
      const tweetError = new Error('no tweet')
      return cb(tweetError)
    }
    const text = twitter.autoLink(tweet.text, {
      urlEntities: tweet.entities.urls
    })
    const result = compile(item)({ text: text })
    return cb(null, result)
  })
}

function splitLocals (item, items, shift) {
  const latestItem = shift ? items.shift() : null
  const threshold = Math.ceil(items.length / 2)
  const hasItems = items.length > 0
  const firstColumnItems = hasItems ? items.slice(0, threshold) : null
  const secondColumnItems = hasItems ? items.slice(threshold) : null

  const locals = localsWithItem(item)
  locals.items = items
  locals.hasItems = hasItems
  locals.latestItem = latestItem
  locals.firstColumnItems = firstColumnItems
  locals.secondColumnItems = secondColumnItems

  return locals
}

function split (item, items, shift, cb) {
  const html = compile(item)(splitLocals(item, items, !!shift))
  cb(null, html)
}

function likes (item, cb) {
  const url = item.header.url

  https.get(url, function onGet (res) {
    const parser = pickup({ eventMode: true })

    function done (er, result) {
      res.unpipe(parser)
      parser.removeListener('error', onError)
      parser.removeListener('entry', onEntry)
      parser.removeListener('finish', onFinish)
      cb(er, result)
    }

    function onError (er) { done(er) }

    let articles = []
    function onEntry (article) { articles.push(article) }

    function onFinish () {
      const result = compile(item)({ articles: articles })
      done(null, result)
    }

    parser.once('error', onError)
    parser.on('entry', onEntry)
    parser.once('finish', onFinish)

    res.pipe(parser)
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
  let managed = 0
  const stops = []
  scan()
  return function stopAll () {
    while (stops.length) stops.shift()()
  }
  function scan () {
    while (managed < grammars.length - 1) {
      stops.push(
        clean(grammars[managed], 'repository', 2000, () => {
          scan() // start watching new grammars if they are added later.
        }),
        clean(grammars[managed++], 'initialRule', 2000)
      )
    }
  }
}

const hl = new Highlights()
cleanup(hl.registry.grammars)

const languages = [
  'language-erlang',
  'language-swift'
]

languages.forEach((language) => {
  hl.requireGrammarsSync({
    modulePath: require.resolve(language + '/package.json')
  })
})

const mappings = {
  sh: 'source.shell',
  markdown: 'source.gfm',
  erb: 'text.html.erb'
}

function scopeNameFromLang (highlighter, lang) {
  if (mappings[lang]) return mappings[lang]
  const grammar = pickBy(hl.registry.grammarsByScopeName, (val, key) => {
    return val.name.toLowerCase() === lang
  })
  if (Object.keys(grammar).length) {
    return Object.keys(grammar)[0]
  }
  const name = 'source.' + lang
  mappings[lang] = name
  return name
}

const md = markdown({
  highlight: (str, lang) => {
    const scope = scopeNameFromLang(hl, lang)
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
  item.read(item.paths.posts, (er, items) => {
    if (er) return cb(er)
    const articles = items.map(localsWithItem)
    articles.sort((a, b) => {
      return (a.date - b.date) * direction
    })
    return cb(er, articles)
  })
}

function rss (item, cb) {
  posts(item, -1, (er, articles) => {
    if (er) return cb(er)
    const locals = {
      channel: channel(item, articles),
      entries: articles.map(entry)
    }
    const xml = compile(item)(locals)
    return cb(null, xml)
  })
}

function article (item, cb) {
  const locals = localsWithItem(item)
  const html = compile(item)(locals)
  cb(null, html)
}

function lastDate (articles) {
  if (!Array.isArray(articles)) return null
  const first = articles[0]
  return first.date // undefined is fine
}

function home (item, cb) {
  posts(item, -1, (er, articles) => {
    item.date = lastDate(articles)
    if (er) return cb(er)
    split(item, articles.slice(0, 5), true, (er, html) => {
      cb(er, html)
    })
  })
}

function archive (item, cb) {
  posts(item, -1, (er, articles) => {
    if (er) return cb(er)
    split(item, articles, false, (er, html) => {
      cb(er, html)
    })
  })
}

if (module === require.main) {
  console.log(exports)
  process.exit(0)
}
