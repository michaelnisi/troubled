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

const https = require('https')
const pickup = require('pickup')
const pug = require('pug')
const qs = require('querystring')
const rehypePrism = require('rehype-prism')
const rehypeStringify = require('rehype-stringify')
const remarkRehype = require('remark-rehype')
const remarkParse = require('remark-parse')
const request = require('request')
const strftime = require('prettydate').strftime
const twitter = require('twitter-text')
const unified = require('unified')
const loadLanguages = require('prismjs/components/')

loadLanguages([
  'erlang',
  'swift',
  'bash',
  'coffeescript',
  'rust',
  'python',
  'perl'
])

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

function updated (article) {
  if (typeof article.updated !== 'string') {
    return null
  }
  const date = new Date(article.updated)
  if (isNaN(date.getTime())) {
    return null
  }
  return date
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
      let error

      const end = Math.min(10, articles.length)
      const topTen = articles.sort((a, b) => {
        const dateA = updated(a)
        const dateB = updated(b)
        if (!dateA || !dateB) {
          error = new Error('missing date(s)')
          return 0
        }
        return dateB - dateA
      }).slice(0, end)

      if (error) return cb(error)

      const result = compile(item)({ articles: topTen })
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
    pubDate: item.date,
    lastBuildDate: item.date,
    title: item.header.title,
    href: item.header.link + item.header.name,
    link: item.header.link,
    description: item.header.description
  }
}

// Returns a new Markdown processor.
function createProcessor () {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
}

function localsWithItem (item) {
  const image = `https://troubled.pro/${item.header.image || 'img/michael_2x.jpg'}`
  const processor = createProcessor()

  return {
    content: processor.processSync(item.body),
    date: item.date,
    dateString: strftime(item.date, '%d %B %Y'),
    description: item.header.description,
    icons: item.header.icons,
    link: item.link,
    name: item.name,
    pubDate: item.date.toUTCString(),
    title: item.header.title,
    url: `https://troubled.pro/${item.link}`,
    image: image,
    card: image.indexOf('large') !== -1 ? 1 : 0
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
    item.date = lastDate(articles)
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
    if (er) return cb(er)
    item.date = lastDate(articles)
    split(item, articles.slice(0, 5), true, (er, html) => {
      cb(er, html)
    })
  })
}

function archive (item, cb) {
  posts(item, -1, (er, articles) => {
    if (er) return cb(er)
    item.date = lastDate(articles)
    split(item, articles, false, (er, html) => {
      cb(er, html)
    })
  })
}

if (module === require.main) {
  console.log(exports)
  process.exit(0)
}
