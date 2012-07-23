archive = require './archive.js'

bake = (item, callback) ->
  archive.bake item, callback

exports.bake = bake
