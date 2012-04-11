# The home.js module renders the home page.

# Require external dependencies.
jade = require 'jade'
blake = require 'blake'
archive = require './archive.js'

# Apply bake function of archive module.
bake = (src, callback) ->
  archive.bake src, callback

# Export API.
exports.bake = bake
