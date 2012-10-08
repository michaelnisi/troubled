# getArticles - get posts sorted by date

getLocals = require './getLocals.js'

module.exports = (item, direction, callback) ->
  item.read item.paths.posts, (err, items) ->
    return callback err if err?

    articles = []
    articles.push getLocals it for it in items

    articles.sort (a, b) ->
      (a.time - b.time)* direction
    
    callback err, articles
