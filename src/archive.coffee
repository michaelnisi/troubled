# This module renders a archive page, displaying all blog posts.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'

# Require article view.
article = require './article.js'

# Create options object for Jade and compile template function to generate
# the home page. Populate a locals object to apply the template function
# with. Apply callback with resulting html result.
compile = (src, items, callback) ->
  options =
    filename: src.templatePath
    pretty: true

  toArchive = jade.compile src.template, options
  
  hasItems = items? and items.length > 0
  threshold = (items.length / 2) + 1

  locals = 
    title: src.header.title
    items: items
    dateString: items[0].dateString
    hasItems: hasItems 
    latestItem: if hasItems then items[0] else null
    firstColumnItems: items.slice 0, threshold
    secondColumnItems: items.slice threshold

  html = toArchive locals

  callback null, html

# Read all posts and initialize an array to store the populated post items.
# Iterate over the loaded files and store the resulting post item in the
# items array. Sort the items by date, compile the html page with the
# latest 7 posts and apply the callback.
bake = (src, callback) ->
  blake.readFiles src.paths.posts, (err, files) ->
    throw err if err
    
    items = []
    items.push article.getLocals(file, src.paths) for file in files
    items.sort (a, b) ->
      (a.time - b.time)* -1
    
    compile src, items, (err, html) ->
      callback err, src, html

# Export API.
exports.bake = bake
