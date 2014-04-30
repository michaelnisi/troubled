
// tweet - snippet of latest tweet

var request = require('request')
  , compile = require('./compile.js')
  , twitter = require('twitter-text')
  , qs = require('querystring')

function params (screen_name) {
  return {
    screen_name: screen_name,
    count: 1
  }
}

function oauth (env) {
  return {
    consumer_key: env.CONSUMER_KEY
  , consumer_secret: env.CONSUMER_SECRET
  , token: env.ACCESS_TOKEN
  , token_secret: env.ACCESS_TOKEN_SECRET
  }
}

function opts (screen_name, url) {
  return {
    url: url += qs.stringify(params(screen_name))
  , oauth: oauth(process.env)
  }
}

function parse (body) {
  var tweets = JSON.parse(body)
  return tweets[0]
}

module.exports = function(item, cb) {
  var header = item.header
    , url = header.url
    , screen_name = header.screen_name

  return request(opts(screen_name, url), function (er, res, body) {
    if (er) return cb(er)
    var tweet = parse(body)
    if (!((tweet != null) && (tweet.text != null))) {
      return cb(new Error('No tweet'))
    }
    var text = twitter.autoLink(tweet.text, {
      urlEntities: tweet.entities.urls
    })
    var result = compile(item)({ text:text })
    return cb(null, result)
  })
}
