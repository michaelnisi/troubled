# The home.js module renders the home page.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'

# Require the article view.
article = require './article.js'

# Read file with provided filename and request the according source object
# from blake. Get the Jade locals object for our source object and add the
# locals object to the locals array.
addItem = (name, locals, paths, callback) ->
  blake.readFile name, (err, file) ->
    throw err if err

    src = blake.getSource file, name, paths
    locals = article.getJadeLocals src
    locals.push locals
    
    callback err, locals


# Iterate over names and add one item per name to the item array. Apply
# callback if all items returned. Note that that this is parallel IO. We
# return control when all files are read.
addItems = (paths, names, items, callback) ->
  for name in names
    addItem name, paths, items, (err, items) ->
      if items.length is names.length
        callback null, items

#
compile = (src, posts, callback) ->
  options = 
    filename: src.templatePath
    pretty: true

  home = jade.compile src.template, options
  recent = posts[0]
  locals = 
    mainNavigationItems: src.header.menu
    title: src.header.title
    items: items
    dateString: latestItem.dateString

  callback null, home locals

#
bake = (src, callback) ->
  blake.readDir src.paths.posts, (err, names) ->
    throw err if err

    addItems src.paths, names, [], (err, posts) ->
      posts.sort (a, b) ->
        (a.time - b.time) * -1

      compile src, posts, (err, html) ->
        callback src.path, src.name, html

# Export API.
module.exports =
  bake: bake
