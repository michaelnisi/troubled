# This module covers configuration.

# Path conventions to use for input data.
exports.paths =
  data: '/data',
  templates: '/templates/',
  resources: '/resources/',
  posts: '/data/posts'

# Export map with bake functions by template names.
exports.bakeFunctions =
  'rss.jade': require('./rss.js').bake,
  'article.jade': require('./article.js').bake,
  'home.jade': require('./home.js').bake,
  'about.jade': require('./about.js').bake,
  'archive.jade': require('./archive.js').bake