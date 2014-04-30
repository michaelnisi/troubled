
// likes - generate likes list

var https = require('https')
  , compile = require('./compile')
  , pickup = require('pickup')

module.exports = function (item, cb) {
  var url = item.header.url
    , parser = pickup()
    , articles = []

  https.get(url, function (res) {
    return res.pipe(parser)
  })
  parser.on('error', function (er) {
    return cb(er)
  })
  parser.on('entry', function (article) {
    return articles.push(article)
  })
  return parser.on('finish', function () {
    var result = compile(item)({
      articles: articles
    })
    return cb(null, result)
  })
}
