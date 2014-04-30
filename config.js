
// config - configure blake

exports.paths = {
  data: 'data'
, templates: 'templates'
, resources: 'resources'
, posts: 'data/posts'
}

exports.views = {
  'rss.jade': require('./src/rss.js')
, 'article.jade': require('./src/article.js')
, 'home.jade': require('./src/home.js')
, 'about.jade': require('./src/about.js')
, 'error.jade': require('./src/about.js')
, 'archive.jade': require('./src/archive.js')
, 'likes.jade': require('./src/likes.js')
, 'tweet.jade': require('./src/tweet.js')
}

if (module === require.main) {
  console.log(exports)
  process.exit(0)
}
