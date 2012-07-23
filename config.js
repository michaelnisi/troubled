exports.paths = {
  data: 'data'
, templates: 'templates'
, resources: 'resources'
, posts: 'data/posts'
}

exports.views = {
  'rss.jade': require('./views/rss.js').bake
, 'article.jade': require('./views/article.js').bake
, 'home.jade': require('./views/home.js').bake
, 'about.jade': require('./views/about.js').bake
, 'archive.jade': require('./views/archive.js').bake
, 'likes.jade': require('./views/likes.js').bake
, 'tweet.jade': require('./views/tweet.js').bake
}
