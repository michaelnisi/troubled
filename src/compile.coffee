jade = require 'jade'

module.exports = (item) ->
  options = 
    filename: item.templatePath
    pretty: true

  jade.compile item.template, options
