# archive - generate archive page

getArticles = require './getArticles.js'
split = require './split.js'

module.exports = (item, callback) ->
  getArticles item, -1, (err, articles) ->
    return callback err if err?
    split item, articles, false, (err, html) ->
      callback err, html
