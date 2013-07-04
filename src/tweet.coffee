# tweet - generate tweet snippet from latest tweet

request = require 'request'
compile = require './compile.js'
twitter = require 'twitter-text'
qs = require 'querystring'

module.exports = (item, callback) ->
  oauth = 
    consumer_key: process.env.CONSUMER_KEY
    consumer_secret: process.env.CONSUMER_SECRET
    token: process.env.ACCESS_TOKEN
    token_secret: process.env.ACCESS_TOKEN_SECRET

  params =
    screen_name: item.header.screen_name
    count: 1

  options =
    url: item.header.url += qs.stringify params
    oauth: oauth

  request options, (err, resp, body) ->
    return callback err if err?

    tweets = JSON.parse body
    tweet = tweets[0]
    
    return callback new Error 'No tweet' unless tweet? and tweet.text?

    text = twitter.autoLink tweet.text, { urlEntities: tweet.entities.urls }
    jadeCompile = compile item
    result = jadeCompile
      text: text

    callback null, result
