# This module bakes the about page.

# Require external dependencies.
jade = require 'jade'
{ markdown } = require 'markdown'

# Create jade options with filename set to template, which is required for 
# template includes and template inheritance. Setup Jade compile function with
# the template and the options. And finally compile jade template with
# according locals.
bake = (src, callback) ->
	options = 
		filename: src.templatePath
		pretty: true
	
	jadeCompile = jade.compile src.template, options
	
	result = jadeCompile
		title: src.header.title
		description: src.header.description
		content: markdown.toHTML src.body
		dateString: src.dateString

	callback null, src.path, src.name, result

# Export API.
module.exports = 
	bake: bake
