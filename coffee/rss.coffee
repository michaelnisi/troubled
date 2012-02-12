# The rss.js module generates the RSS feed.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'
markdown = (require 'markdown').markdown

# Get source file for input file and return a new RSS feed item populated 
# with the values form the source object. 
getItem = (file, filename, paths) ->
  src = blake.getSource file, filename, paths

  unless src? 
    return

  title: src.header.title
  description: src.header.description
  content: "<h4>#{src.header.description}</h4>#{markdown.toHTML src.body}"
  link: src.link
  date: src.dateString

# After reading the article file, get the RSS feed item for that article
# and add it to the items array.
addItem = (name, paths, items, callback) ->
  blake.readFile name, (err, data) ->
    throw err if err

    item = getItem data, name, paths
    items.push item
    callback err, items

# Read the directory on the given path.
readDir = (path, callback) ->
  blake.readDir path, callback

# A
addItems = (paths, names, items, callback) ->
  for name in names
    addItem name, paths, items, (err, items) ->
      if items.length is names.length
        callback null, items

# Create options object for Jade with a filename property pointing to our
# template path and the pretty property set to true. Compile a Jade
# function with our template and our options. Create the locals object,
# which is used by Jade to populate the fields in our template. Apply our
# Jade function with the locals object to generate the RSS feed.
compile = (src, items, callback) ->
  options =
    filename: src.templatePath
    pretty: true

  rss = jade.compile src.template, options

  locals = 
    items: items
    channel: 
      date: src.dateString
      title: src.header.title
      description: src.header.description

  result = rss locals

  callback null, src.path, src.name, result

# Create array to store posts. Read the posts directory and iterate over the
# post filenames to add each post to the items array, which we probably should
# rename into posts. Apply the callback when items is completely populated.
bake = (src, callback) ->
  posts = []
  
  readDir src.paths.posts, (err, names) ->
    throw err if err

    addItems src.paths, names, posts, (err, posts) ->
      compile src, posts, callback

# Export API
module.exports = 
  bake: bake
  getItem: getItem
