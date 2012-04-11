(function() {

  exports.paths = {
    data: 'data',
    templates: 'templates',
    resources: 'resources',
    posts: 'data/posts'
  };

  exports.bakeFunctions = {
    'rss.jade': require('./rss.js').bake,
    'article.jade': require('./article.js').bake,
    'home.jade': require('./home.js').bake,
    'about.jade': require('./about.js').bake,
    'archive.jade': require('./archive.js').bake,
    'likes.jade': require('./likes.js').bake,
    'tweet.jade': require('./tweet.js').bake
  };

}).call(this);
