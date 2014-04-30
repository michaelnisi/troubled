
// archive - generate archive page

var getArticles = require('./getArticles')
  , split = require('./split.js')

module.exports = function(item, cb) {
  return getArticles(item, -1, function(er, articles) {
    if (er) return cb(er)
    return split(item, articles, false, function(er, html) {
      return cb(er, html);
    })
  })
}
