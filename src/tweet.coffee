request = require 'request'
compile = require './compile.js'
twitter = require 'twitter-text'

module.exports = (item, callback) ->
  request item.header.url, (err, resp, body) ->
    return callback err if err?

    tweets = JSON.parse body
    tweet = tweets[0]

    return callback new Error 'No tweet' unless tweet? and tweet.text?

    text = twitter.autoLink tweet.text, { urlEntities: tweet.entities.urls }
    jadeCompile = compile item
    result = jadeCompile
      text: text

    callback null, result
