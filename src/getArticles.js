
// articles - generate sorted list of articles

var locals = require('./getLocals')

module.exports = function(item, direction, cb) {
  return item.read(item.paths.posts, function(er, items) {
    if (er) return cb(er)
    var articles = []
    items.forEach(function (item) {
      articles.push(locals(item))
    })
    articles.sort(function(a, b) {
      return (a.time - b.time) * direction
    })
    return cb(er, articles)
  })
}
