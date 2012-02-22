{
  "title": "CoffeeScript",
  "description": "It's just JavaScript, but sweeter",
  "template": "article.jade",
  "date": "2012-02-12"
}
$end

In the end CoffeeScript is just JavaScript, but along the way of writing code it is much more.

No global variables, CommonJS modules

No superset, whitespace—sane formatting

Less lines, less code

The last expression in a function is returned

splats and default arguments

comprehensions

strings

fat arrow function

myFunction(item) for item in items

Let's look at something a little more elaborate, the RSS feed of this site.

	# The rss.js module generates the RSS feed.

	# Require external dependencies.
	jade = require 'jade'
	blake = require 'blake'
	markdown = (require 'markdown').markdown

	# Get source object for input file from blake and return a new RSS feed item
	# populated with the values from the source object. 
	getItem = (file, paths) ->
	  src = blake.getSource file.content, file.name, paths

	  title: src.header.title
	  description: src.header.description
	  content: "<h4>#{src.header.description}</h4>#{markdown.toHTML src.body}"
	  link: src.link
	  date: src.dateString
	  time: src.date.getTime()

	# Create options object for Jade with a filename property pointing to our
	# template path and the pretty property set to true. Compile a Jade
	# function with our template and our options. Create the locals object,
	# which is used by Jade to populate the fields in our template. Apply our
	# Jade function with the locals object to generate the RSS feed.
	compile = (src, items, callback) ->
	  options =
		filename: src.templatePath
		pretty: true

	  rss = jade.compile src.template, options

	  locals = 
		items: items
		channel: 
		  date: src.dateString
		  title: src.header.title
		  link: src.header.link
		  description: src.header.description

	  result = rss locals

	  callback null, result

	# Read all posts and initialize an array to store the final items of the RSS
	# feed. Iterate over posts and add a feed item per post to the items array.
	# Sort the items descending by date (newest entry first). Compile the RSS feed
	# and apply the callback.
	bake = (src, callback) ->
	  blake.readFiles src.paths.posts, (err, files) ->
		throw err if err
		
		items = []
		items.push getItem(file, src.paths) for file in files
		items.sort (a, b) ->
		  (a.time - b.time)* -1

		compile src, items, (err, xml) ->
		  callback null, src.path, src.name, xml

	# Export API.
	module.exports = 
	  bake: bake

*Snippet 1: The RSS view of this site*

I am especially inclined by the subtle push to a more functional programmning style by the implicit return of each function's last statement.
