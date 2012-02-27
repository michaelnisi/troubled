# This module is used to bake a single article.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'
markdown = (require 'markdown').markdown

# Return a new locals object from the provided source object. The returned 
# locals object is used by jade to populate fields in the template.
getLocals = (srcOrFile, paths) ->
  if paths?
    src = blake.getSource srcOrFile.content, srcOrFile.name, paths
  else 
    src = srcOrFile

  title: src.header.title
  description: src.header.description
  content: markdown.toHTML src.body
  link: src.link
  date: src.date
  time: src.date.getTime()
  dateString: src.dateString

# Create options object for Jade with the filename property set to the path
# to our template. Get a Jade compile function with template and options. 
# Apply Jade compile function with Jade locals created from our source.
bake = (src, callback) ->
  options = 
    filename: src.templatePath
    pretty: true

  jadeCompile = jade.compile src.template, options
  result = jadeCompile getLocals src

  callback null, src.path, src.name, result

# Export API.
module.exports = 
  bake: bake
  getLocals: getLocals
