{
  "title": "CoffeeScript",
  "description": "It's just JavaScript, but sweeter",
  "template": "article.jade",
  "date": "2012-03-21"
}

After I wrote Blake, a Node.js module for generating static websites, implementing the views for this site offered a good opportunity to degust CoffeeScript and answer following questions.

What are the advantages of CoffeeScript? 
Does writing CoffeeScript outweigh the extra step of transcompilation and how does this extra step influence the workflow.
Who should use it for what?

As CoffeeScript transcompiles to JavaScript, I briefly reintroduce JavaScript first. JavaScript is a lightweight, object-oriented language, most known as the scripting language for web pages, but used in many non-browser environments as well. JavaScript was created in 1995 by Brendan Eich at Netscape. His objective was to make it look like Java, but he subversivly made it look like C, which went unnoticed. The name was a marketing stunt to free ride the [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) hype of the time. The language however has nothing in common with Java, its idiotic name has been contributing to JavaScript's misinterpretation until this day. JavaScript is the Cinderella of programming languages. I enjoy writing it, hence I love Node, but its syntax is pierced with curly braces and semicolons, not to mention the lack of expressivness of its implicit power.

Popular JavaScript engines are:

Google's V8, which is used in the Google Chrome browser.
The JavaScriptCore (SquirrelFish/Nitro) used in some WebKit browsers such as Apple Safari.
Mozilla's SpiderMonkey

http://arewefastyet.com/

CoffeeScript is the little mystery programming language, written by Jeremy Ashkenas. The language is inspired by Ruby, Python and Haskell; it adds features like array comprehension and pattern matching.

I never been fond of transcompilation, but CoffeeScript's elegance seduced me to try it. With my first sips of CoffeeScript my skepticism transformed into enthusiasm, writing plain JavaScript just doesn't cut it anymore. It has this stale taste of something that was great in the past, but when revisited, isn't that great anymore. Don't get me wrong, I appreciate JavaScript. ActionScript, an ECMAScript derivate, had been my bread and butter language for the longest time, so my relationship with JavaScript is rather intimate, which is probably one of the reasons why I'm embracing CoffeeScript. So, what are the main advantages?



No global variables, CommonJS modules

I was always hesitant in regards of meaningful whitespace, but when I came to think about it again I realized that it solves the problem of sane formatting. With meaningful whitespace you no longer have to argue about why expressing once individuality in code formatting isn't cool. Less discussions about things that are not relevant to user experience are good.

Less lines, less code

The last expression in a function is returned

splats and default arguments

comprehensions

strings

fat arrow function

myFunction(item) for item in items

Destructuring assignments

	{a, b} = { a:'a', b:'b' }
	console.log "a is '#{a}', b is '#{b}'"


In the wild 

Rails. DHH: "Looking at CoffeeScript was the first time I got a little bit of language envy." 

Ward Cunningham

The CoffeeScript compiler itself is written in CoffeeScript.

It's just JavaScript, but with more sugar.
