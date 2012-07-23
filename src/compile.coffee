jade = require 'jade'

compile = (item) ->
  options = 
    filename: item.templatePath
    pretty: true

  jade.compile item.template, options

module.exports = compile
