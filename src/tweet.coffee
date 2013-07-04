# tweet - generate tweet snippet from latest tweet

request = require 'request'
compile = require './compile.js'
twitter = require 'twitter-text'
qs = require 'querystring'

module.exports = (item, callback) ->
  { url, screen_name } = item.header
  
  { CONSUMER_KEY, 
    CONSUMER_SECRET, 
    ACCESS_TOKEN, 
    ACCESS_TOKEN_SECRET } = process.env 
  
  oauth = 
    consumer_key: CONSUMER_KEY
    consumer_secret: CONSUMER_SECRET
    token: ACCESS_TOKEN
    token_secret: ACCESS_TOKEN_SECRET

  params =
    screen_name: screen_name
    count: 1

  options =
    url: url += qs.stringify params
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
