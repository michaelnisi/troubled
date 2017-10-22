{
  "title": "Internal Affairs",
  "description": "Two ways to apply conditional exports to make internal functions testable in Node.js and why you shouldn’t.",
  "date": "2016-12-07",
  "path": "2016/12"
}

BUILDING something with your hands, adjusting to immediate feedback from the physical world, is fun. Writing software, this kind of instant gratification isn‘t just there, but can be aquired.

Continuous testing during development is reassuring and, through tighter cycles, gives orientation. Doing this by poking at newly written code from a REPL is fine, but it‘s ephemeral and too much repetetive typing. Ideally, I want to test each function, while I’m honing it, building up a code base of sharp tested units. Iterating like this often requires for testing of private functions, not public to the API of the program.

To not clutter the API by overexposing, I want to conditionally export functions to temporarily extend the surface area of my program during testing. I know, critics would say, that’s not what unit testing is for, because now you’re testing implementation, instead of application, but that’s exactly what I want to do, sometimes at least, test implementation, inspecting each bit as I fit it into the program.

With [EUnit](http://erlang.org/doc/man/eunit.html), a unit testing framework for [Erlang](https://www.erlang.org/), we use the `TEST` macro for conditional compilation:

```erlang
-ifdef(TEST).
some_test() ->
  1 = 2.
-endif.
```

If the macro is defined, the test is compiled and will be run by EUnit, it runs all functions ending in `_test` as simple tests. Speaking of EUnit, in its terminology **unit testing** is:

> Testing that a program unit behaves as it is supposed to do (in itself), according to its specifications. Unit tests have an important function as regression tests, when the program later is modified for some reason, since they check that the program still behaves according to specification.

Interpreted at runtime, without macros at our command, how can we conditionally run code in JavaScript, or more precisely, export functions in [Node.js](https://nodejs.org/)? In Node, like in Erlang, we write modules, these modules export functions, which make up the external APIs of our modules. So, how can we test functions that haven’t been exported by our Node module?

I’ve been using environment variables for this. Exporting something like `NODE_TEST`, before running my tests, enables my modules to expose internals, when run in a test. In my modules, usually at the end, I have a block that checks for `NODE_TEST` and exposes internal functions if it’s there.


```js
if (parseInt(process.env.NODE_TEST, 10) === 1) {
  exports.internalFunction = internalFunction
  // etc.
}
```

Now I can test these specifically exported internals by running my tests like this:

```
NODE_TEST=1 node test/http.js
```

Applying this technique recently, I figured, there must be internal properties in Node, from which to infer if my program is run in a test environment. I’m sure there are others, but the most obvious one, the path of the main module, did the job for me.

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

And my npm manifests, forgoing the `NODE_TEST=1`, look better too:

```
"scripts": {
  "pretest": "standard",
  "test": "tap test/*.js -b --cov",
  "posttest": "rm -rf /tmp/awesome-[1-9]*"
}
```

*A note on my tools*, in case you are wondering: [standard](http://standardjs.com/) is a great analyzer, taking care of the boring stuff, saving me hours of debugging; and [node-tap](http://www.node-tap.org/), of course, is the definitive test framework for Node.js. By analogy with Erlang, the [Dialyzer](http://erlang.org/doc/man/dialyzer.html) and EUnit of Node. Especially in JavaScript, a language without ropes and safety gear, static analysis and unit testing are priceless.

Analogously to [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing), this way of of testing is sometimes referred to as [white-box testing](https://en.wikipedia.org/wiki/White-box_testing) and it‘s problematic, of course. You are modifying your API, skewing it while testing, which can make the tests unrealistic. They might all be passing, checking internals, while missing external perspective. Another issue is dead code. If you test outside your public APIs, you cannot apply code coverage tools to locate unused code, because your tests might access code, not used from anywhere else. So, 100% percent code coverage doesn’t really mean much then. 100% of what? For me, this is not problem, I still love to use code coverage, because it gives a different perspective on the program, showing hot paths, for example. Also, there are plenty ways to spot unused code, the obvious `grep(1)`, for example, to search for function usage.
