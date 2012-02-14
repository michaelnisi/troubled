# The home.js module renders the home page.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'

# Require the article view.
article = require './article.js'

# Get the source object for the specified file and return the according Jade
# locals object, representing this blog post.
getItem = (file, paths) ->
  src = blake.getSource file.content, file.name, paths
  locals = article.getJadeLocals src

# Create options object for Jade and compile template function to generate the 
# home page. Populate a locals object to apply the template function with it.
# Apply callback with resulting html result.
compile = (src, items, callback) ->
  options = 
    filename: src.templatePath
    pretty: true

  home = jade.compile src.template, options

  locals = 
    mainNavigationItems: src.header.menu
    title: src.header.title
    items: items
    dateString: items[0].dateString

  html = home locals

  callback null, html

# Read all posts and initialize an array to store the populated post items.
# Iterate over the loaded files and store the resulting post item in the
# items array. Sort the items by date, compile the html page with the latest
# 6 posts and apply the callback.
bake = (src, callback) ->
  blake.readFiles src.paths.posts, (err, files) ->
    throw err if err
    
    items = []
    items.push getItem(file, src.paths) for file in files
    items.sort (a, b) ->
      (a.time - b.time)* -1
    
    compile src, items[0..5], (err, html) ->
      callback null, src.path, src.name, html

# Export API.
module.exports =
  bake: bake
