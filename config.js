exports.paths = {
  data: 'data'
, templates: 'templates'
, resources: 'resources'
, posts: 'data/posts'
}

exports.views = {
  'rss.jade': require('./views/rss.js')
, 'article.jade': require('./views/article.js')
, 'home.jade': require('./views/home.js')
, 'about.jade': require('./views/about.js')
, 'error.jade': require('./views/about.js')
, 'archive.jade': require('./views/archive.js')
, 'likes.jade': require('./views/likes.js')
, 'tweet.jade': require('./views/tweet.js')
}

if (module === require.main) {
  console.log(exports)
  process.exit(0)
}
