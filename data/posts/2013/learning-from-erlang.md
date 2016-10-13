{
  "title": "Learning from Erlang",
  "description": "Fascinated by the use of recursion and pattern matching in Erlang, I marvel at a quicksort implementation.",
  "template": "article.pug",
  "date": "2013-03-06",
  "path": "2013/03"
}

IN THE PROCESS of learning [Erlang](http://www.erlang.org/) I find myself mesmerized by particularly concise—yet rich—pieces of code which make me pause to contemplate:

```erlang
quicksort([]) -> [];
quicksort([Pivot|Rest]) ->
  quicksort([Smaller || Smaller <- Rest, Smaller =< Pivot])
  ++ [Pivot] ++
  quicksort([Larger || Larger <- Rest, Larger > Pivot]).
```

This naive, easy to understand, [quicksort](http://en.wikipedia.org/wiki/Quicksort) takes the first item of a list as a pivot by which it sorts the items in two lists; one for smaller, the other for larger items.

Trying to express similar in JavaScript, I wrote:

```js
function quicksort (a) {
  if (a.length <= 1) return a
  var pivot = a.shift()
  var smaller = []
  var larger = []
  a.forEach(function (x) {
    x <= pivot ? smaller.push(x) : larger.push(x)
  })
  return quicksort(smaller).concat(pivot, quicksort(larger))
}
```

In his highly recommended book [Learn You Some Erlang for Great Good!](http://learnyousomeerlang.com/), from where the above quicksort stems, [Fred Hébert](http://ferd.ca/) writes:
> Recursion coupled with pattern matching is sometimes an optimal solution to the problem of writing concise algorithms that are easy to understand. By subdividing each part of a problem into separate functions until they can no longer be simplified, the algorithm becomes nothing but assembling a bunch of correct answers coming from short routines.

Contemplate—for Great Good!
