{
  "title": "Internal Affairs",
  "description": "Two ways to apply conditional exports to make internal functions testable in Node.js and why you shouldn’t.",
  "date": "2016-12-03",
  "path": "2016/12"
}

TEST A LITTLE, code a litte. During development, I want to test every function I write as I go along, building a code base of small tested units. Iterating like this often requires for testing of private functions, not public to the API of the program. To not over expose the API, we need a way to conditionally export functions to extend the surface of our program during testing. I know, some people argue, that’s not what unit testing is for, because now you’re testing implementation, instead of application, but that’s exactly what I want to test: implementation. I tend to identify required functions, which is the hardest part, and develop them by oscilating between test and code, where code is the wrong word, both are code, and together with documentation they shape the program—from the inside.

With EUnit, a unit testing framework for Erlang, we use the `TEST` macro for conditional compilation:

```erlang
-ifdef(TEST).
some_test() ->
  1 = 2.
-endif.
```

Interpreted at runtime and having no macros at command, how can we conditionally run code in JavaScript, or more precisely, export functions in Node.js? In Node, we write modules, these modules export functions, which make up the external APIs of our modules. So, how then would we test functions that are not exported?

I’ve been using environment variables for this. Exporting `NODE_TEST`, before running my tests, enables my modules to expose internals, when run in a test enviroment
. In my modules, usually at the end, I have a block that checks an environment variable, say `NODE_TEST`, and exposes internal functions if it’s there.


```js
if (parseInt(process.env.NODE_TEST, 10) === 1) {
  exports.internalFunction = internalFunction
  // etc.
}
```

Now I can test internals by running my tests like this:

```
NODE_TEST=1 node test/http.js
```

Applying this recently, I reasoned there must be internal properties in Node from which to infer if my program is run in a test environment. I’m sure there are others, but the most obvious one, the path of the main module, did the job for me.

```js
if (process.mainModule.filename.match(/test/) !== null) {
  exports.internalFunction = internalFunction
  // etc.
}
```

With this simple regular expression, I can test without modifying the environment:

```
node test/http.js
```

And my npm manifests, forgoing the `NODE TEST=1`, look better too:

```
"scripts": {
  "pretest": "standard",
  "test": "tap test/*.js -b --cov",
  "posttest": "rm -rf /tmp/awesome-[1-9]*"
}
```

In case you are wondering, [standard](http://standardjs.com/) is a great analyzer, saving you hours of debugging; and [node-tap](http://www.node-tap.org/), of course, is the definitive test framework for Node.js. By analogy with Erlang, the [Dialyzer](http://erlang.org/doc/man/dialyzer.html) and EUnit of Node.

Here are the caveats, not against the technique, but against testing internal code in general. You are modifying your API, skewing it while testing, which can make the tests unrealistic. They might all be passing, checking internals, while missing external perspective. Another issue is dead code. If you test outside your public APIs, you cannot apply code coverage tools to locate unused code. So, 100% percent code coverage doesn’t really mean much then. 100% of what? For me this is not problem, I still love to use code coverage, because it gives a different perspective on the program. Also, there are plenty ways to spot unused code, the obvious ´grep(1)`, for example, to search for function usage.
