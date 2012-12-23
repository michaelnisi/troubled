{
  "title": "CoffeeScript is just JavaScript",
  "description": "The syntax of CoffeeScript, a programming language that transpiles to JavaScript, is elegant; but transpilers, although influential to future development of languages, are traditionally not well received.",
  "template": "article.jade",
  "date": "2012-12-23",
  "path": "2012/12"
}

I TREASURE JAVASCRIPT for its flexibility. Its syntax isn't great, and it definitely has its [quirks](http://oreilly.com/javascript/excerpts/javascript-good-parts/awful-parts.html), which I tolerate like those of an old companion. That said, I've been intrigued by [CoffeeScript](http://coffeescript.org/) since its introduction, and its appeal increased further, when I heard that [Ward Cunningham](http://en.wikipedia.org/wiki/Ward_Cunningham) writes the client of his new [Wiki](https://github.com/WardCunningham/Smallest-Federated-Wiki) in it. This quiet [site](https://github.com/michaelnisi/troubled/tree/master/src) offered a welcome opportunity to finally try CoffeeScript.

[JavaScript](http://en.wikipedia.org/wiki/JavaScript) is a lightweight, object-oriented language, mostly known as the scripting language for web pages, but used in many non-browser environments as well. JavaScript was created in 1995 by [Brendan Eich](http://brendaneich.com/) at Netscape. His objective was to make it look like Java, but he subversively made it look like [C](http://en.wikipedia.org/wiki/C_(programming_language)). The name was a marketing stunt to free ride the [Java](http://en.wikipedia.org/wiki/Java_(programming_language)) hype of the time. The language however has nothing in common with Java, its idiotic name has been contributing to JavaScript's misinterpretation until [recently](http://javascript.crockford.com/popular.html). JavaScript is the Cinderella of programming languages, long time abused and underrated until its foot fit the golden slipper—from battered toy to lingua franca of the web. Today JavaScript is the top language on [GitHub](https://github.com/languages).

Popular JavaScript engines are: [V8](http://code.google.com/p/v8/), [JavaScriptCore](http://www.webkit.org/projects/javascript/index.html), and [SpiderMonkey](https://developer.mozilla.org/en/docs/SpiderMonkey).

CoffeeScript is a little programming language written by [Jeremy Ashkenas](https://twitter.com/jashkenas). The language is inspired by [Ruby](http://www.ruby-lang.org/en/), [Python](http://www.python.org/), and [Haskell](http://www.haskell.org/); it adds features like comprehensions and pattern matching. The self hosted [source-to-source compiler](http://en.wikipedia.org/wiki/Source-to-source_compiler) (written in CoffeeScript) uses the [jison] (http://zaach.github.com/jison/) JavaScript parser generator to translate CoffeeScript to JavaScript.

Jeremy Ashkenas, known through [backbone](http://documentcloud.github.com/backbone) and [underscore](http://documentcloud.github.com/underscore) fame, began the CoffeeScript experiment in 2010 to answer a simple question:
> What would JavaScript look like, if it could like anything you wanted it to look like?

#### Selected CoffeeScript Features

##### Splats and Default Arguments
    { test } = require('tap')

    add = (sum, values...) ->
      sum += value for value in values
      sum

    test 'add', (t) ->
      t.equal add(1, 2, 3), 6, 'should be 6'
      t.end()

    say = (what = 'Hello') ->
      what

    test 'say', (t) ->
      t.equal say(), 'Hello', 'should be Hello'
      t.equal say('Ciao'), 'Ciao', 'should be Ciao'
      t.end()

##### String Interpolations
    { test } = require 'tap'
    name = 'Coltrane'

    test 'string', (t) ->
      t.equal "John #{ name }", 'John Coltrane', 'should be John Coltrane'
      t.equal "1 + 2 = #{ 1 + 2 }", '1 + 2 = 3', 'should be 1 + 2 = 3'
      t.end()

##### Destructuring Assignments

    { test } = require('tap')
    { name } = name: 'Moe'

    test 'assignment', (t) ->
      t.equal name, 'Moe', 'should be Moe'
      t.end()       

##### Array Comprehensions

    { test } = require('tap')

    getItem = (name) ->
      name: name

    moe = getItem 'Moe'
    larry = getItem 'Larry'
    curly = getItem 'Curly'

    items = [moe, larry, curly]

    test 'iterate', (t) ->
      i = 0
      (i++) for item in items
      t.equal i, 3, 'should be 3'
      t.end()

    test 'map', (t) ->
      names = (item.name for item in items) 
      t.equal typeof name, 'string', 'should be string' for name in names
      t.equal names.length, 3, 'should be 3'
      t.end()

    test 'filter', (t) ->
      item = (item for item in items when item.name is 'Curly')[0]
      t.same item, curly, 'should be curly'
      t.end()

##### Classes and Inheritance
    { test } = require 'tap'

    class Animal
      constructor: (@name) ->
      
    class Dog extends Animal
      greet: () ->
        'Woof!'

    class Beagle extends Dog
      greet: () ->
        super + ' Woof!'

    test 'dogs', (t) ->
      cheech = new Dog 'Cheech'
      t.equal cheech.name, 'Cheech', 'should be Cheech'
      t.equal cheech.greet(), 'Woof!', 'should be Woof!'
      
      chong = new Beagle 'Chong'
      t.equal chong.name, 'Chong', 'should be Chong'
      t.equal chong.greet(), 'Woof! Woof!', 'should be Woof! Woof!'
      
      t.end()  

Details aside, the three most significant features of CoffeeScript are: meaningful whitespace, implicit function returns, and less code. Meaningful whitespace prevents boring discussions about code formatting (semicolons anyone?), implicit function returns cultivate functional programming style, and less code is less code.

*How about debugging?* As one of CoffeeScript's design principles is to maintain the order of instructions in the compiled JavaScript code, it's fairly easy to relate JavaScript stack traces back to CoffeeScript code. I had expected it to be much harder; debugging hasn't been an issue for me so far. But although the generated code is readable, and potentially inspiring for some, one cannot deny the additional layer of complexity caused by the extra step of translation.

Since 3.1 [Rails](http://rubyonrails.org/) ships with CoffeeScript, introducing it at [RailsConf 2011](http://www.rubyinside.com/dhh-keynote-streaming-live-from-railsconf-2011-right-here-right-now-4769.html), [DHH](http://david.heinemeierhansson.com/) stated:
> Looking at CoffeeScript was the first time I got a little bit of language envy. 

Dreaming about [JavaScript Harmony](https://mail.mozilla.org/pipermail/es-discuss/2008-August/006837.html), Brendan Eich wrote:
> CoffeeScript is well done and more convenient to use than JS, provided you buy into the Python-esque significant space and the costs of generating JS from another source language. But semantically it’s still JS.

There has been an amusing [discourse](http://procbits.com/2012/05/18/why-do-all-the-great-node-js-developers-hate-coffeescript/) about CoffeeScript's usefulness in the [Node](http://nodejs.org) community. Most protagonists wrinkle their nose, but [Mikeal Rogers] (http://www.mikealrogers.com) just [loves] (http://www.mikealrogers.com/posts/survey-why-are-you-using-coffeescript.html) Coffee(Script).

[Isaac Schlueter](http://blog.izs.me/) is right:
> CoffeeScript does not offer an order of magnitude difference in expressiveness. I’m not using “expressiveness” as some fuzzy term to mean “how happy you are expressing yourself in X language”, but the more mathy technical meaning of “how many relevant program tokens are required to do X task.” CoffeeScript may require fewer tokens, sure, but not 10 to 1 fewer.

Transpilers are inherently divisive. People who are fluent in the target language will hate the new language; people new to the target language will love the new language, especially if it's related to a language they already know.

[Most](http://blog.floriancargoet.com/2012/03/brainfuck-part-1-what-is-it/) transpilers are valuable. Not only can they inspire further progress, but they also draw new people to their respective target language. CoffeeScript pulls Ruby programmers on board of the [Black Pearl](http://en.wikipedia.org/wiki/Black_Pearl).

*It's just JavaScript.* CoffeeScript waives instruction reordering to stay close to JavaScript. 
Evidently too close for [Max Krohn](https://twitter.com/maxtaco), he [forked](https://github.com/maxtaco/coffee-script) CoffeeScript to write [IcedCoffeeScript](http://maxtaco.github.com/coffee-script/), which adds synchronous control flow mimicry by introducing two new keywords: `await` and `defer`. 
[Coco](https://github.com/satyr/coco) is another more radical CoffeeScript dialect. 
[Six](https://github.com/matthewrobb/six) enables new syntactic features from the [ECMAScript 6](http://addyosmani.com/blog/ecmascript-6-resources-for-the-curious-javascripter/) today.
The CoffeeScript [wiki](https://github.com/jashkenas/coffee-script/wiki) provides an extensive [list](https://github.com/jashkenas/coffee-script/wiki/List-of-languages-that-compile-to-JS) of languages that compile to JavaScript.

Any new language pushes the envelope (even by just fueling conversations), and any new language you learn makes you a better programmer; but to be frank, despite of all these fascinating options, I prefer to write vanilla JavaScript, currently as specified in [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm), the version implemented in V8. Although I enjoy to write CoffeeScript, and recommend anyone to learn it (it's very intuitive and fun); in the realm of JavaScript, I mainly write Node modules. Node is about small open source modules written by the community. Writing open source Node modules in CoffeeScript limits the number of users and contributors, corrodes transparency, and makes it harder to manage the code base. At [LXJS](http://2012.lxjs.org/) [Owen Barnes](https://github.com/owenb) mentioned plans to rewrite [Socket Stream](http://www.socketstream.org/), a popular framework previously implemented in CoffeeScript. 

Ĉu vi parolas [Esperanton](http://en.wikipedia.org/wiki/Esperanto)? [Donald Knuth](http://en.wikipedia.org/wiki/Donald_Knuth) neither: 

> I’m not motivated to learn Esperanto even though it might be preferable to English and German and French and Russian (if everybody switched).

JavaScript is the English of the web: *we use it because we use it.*

You see that my objections are not regarding the language itself, but they are rather practical concerns. I admire CoffeeScript for its elegance and find it delightful that [Michael Ficarra](https://github.com/michaelficarra) secured [funding](http://www.kickstarter.com/projects/michaelficarra/make-a-better-coffeescript-compiler) to make a better CoffeeScript compiler. Programming languages need independent influence from outside committees and corporations. We should be open to all language developments by independent parties.
