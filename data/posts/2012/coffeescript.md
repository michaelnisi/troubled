{
  "title": "CoffeeScript is just JavaScript",
  "description": "The syntax of CoffeeScript, a programming language that transcompiles to JavaScript, is elegant, but transcompilers, although influential to future development of languages, are generally not well received.",
  "template": "article.jade",
  "date": "2012-03-21"
}

I TREASURE JAVASCRIPT for its flexibility; its Syntax isn't great, but I don't mind; its quirks, those of a longtime companion. That said—I'm intrigued by CoffeeScript and its appeal increased, when I heard that [Ward Cunningham](http://en.wikipedia.org/wiki/Ward_Cunningham) uses it in his new [Wiki](https://github.com/WardCunningham/Smallest-Federated-Wiki). The [views](http://michaelnisi.github.com/michaelnisi/home.html) of this quiet site offered a favorable opportunity to finally try it.

JavaScript is a lightweight, object-oriented language, most known as the scripting language for web pages, but used in many non-browser environments as well. JavaScript was created in 1995 by Brendan Eich at Netscape. His objective was to make it look like Java, but he subversivly made it look like C. The name was a marketing stunt to free ride the [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) hype of the time. The language however has nothing in common with Java, its idiotic name has been contributing to JavaScript's misinterpretation until today. JavaScript is the Cinderella of programming languages. Long time abused and underrated. At the moment JavaScript is the top language on [github](https://github.com/languages).

Popular JavaScript engines are Google's [V8](http://code.google.com/p/v8/), which is used in [Chrome](https://www.google.com/chrome) and [Node.js](http://nodejs.org/); [JavaScriptCore](http://www.webkit.org/projects/javascript/) (SquirrelFish/Nitro), used in some [WebKit](http://www.webkit.org/) browsers such as Apple Safari; and Mozilla's [SpiderMonkey](https://developer.mozilla.org/en/SpiderMonkey).

CoffeeScript is the little mystery programming language, written by [Jeremy Ashkenas](https://github.com/jashkenas). The language is inspired by Ruby, Python and Haskell; it adds features like array comprehension and pattern matching. The compiler, written in CoffeeScript, transcompiles source to JavaScript. To provide an overview I list some of its features. 

No global variables, CommonJS modules

##### Implicit returns

I'm particularly fond of the implicit returns of the last expression in functions because it promotes functional programming.

    add = (a, b) ->
      a + b

##### splats and default arguments

##### comprehensions

##### strings

##### Fat arrow

##### For loop

    console.log(item) for item in items

##### Destructuring assignments

	{a, b} = { a:'a', b:'b' }
	console.log "a is '#{a}', b is '#{b}'"

I was always hesitant in regards of meaningful whitespace, but when I came to think about it again I realized that it solves the problem of sane formatting. With meaningful whitespace you no longer have to argue about why expressing once individuality in code formatting isn't cool. Less discussions about things that are not relevant to user experience are good.

Less lines, less code

#### Debugging
How about debugging? As one of CoffeeScript's design principles is to maintain the order of instructions in the compiled JavaScript code, it is rather easy to relate JavaScript stack traces back to CoffeeScript code—almost matching line numbers. I expected it to be much worse; debugging hasn't been an issue for me so far. 
But without any doubt, one cannot deny the necessary extra step of translation, when it comes to analyse problems. The generated code is readable and novice JavaScript programmers might be able to draw inspiration from it.

#### What's wrong with it
There's a discussion about CoffeeScript's usefulness, but in fact this a discussion about the question if transcompilation is useful per se. Some protagonists love to hate it.

#### In the wild 
Rails comes with CoffeeScript. DHH: "Looking at CoffeeScript was the first time I got a little bit of language envy." 

Ward Cunningham writes the frontend of his federated wiki in CoffeeScript.

The CoffeeScript compiler itself is written in CoffeeScript.

#### Future
Transompiled languages are good, not only are they influential on the progress of languages by providing inspiration, but also by drawing new people to the language they transcompile to. In the case of CoffeeScript, it's the Ruby crowd that learns to love JavaScript. Other JavaScript transcompilers and they're general influence on the progress of the language.

It's just JavaScript, but with more sugar.
