# The home.js module renders the home page.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'

# Require views.
archive = require './archive.js'

# Read all posts and initialize an array to store the populated post items.
# Iterate over the loaded files and store the resulting post item in the
# items array. Sort the items by date, compile the html page with the latest
# 7 posts and apply the callback.
bake = (src, callback) ->
  archive.bake src, callback

# Export API.
module.exports =
  bake: bake
