compile = require './compile.js'
getArticles = require './getArticles.js'
process = require './process.js'

module.exports = (item, callback) ->
  getArticles item, -1, (err, articles) ->
    return callback err if err?
    process item, articles, false, (err, html) ->
      callback err, html
