
// home - generate home page

var getArticles = require('./getArticles')
  , split = require('./split')

module.exports = function (item, cb) {
  return getArticles(item, -1, function(er, articles) {
    if (er) return cb(er)
    return split(item, articles.slice(0, 5), true, function (er, html) {
      return cb(er, html)
    })
  })
}
