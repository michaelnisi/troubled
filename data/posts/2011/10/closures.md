{
  "title": "Closure",
  "description": "A function together with a referencing environment",
  "template": "article.jade",
  "date": "2011-10-18"
}

A closure is a function together with a referencing environment for the non-local variables of that function. A closure allows a function to access variables outside its typical scope. Such a function is said to be *closed over* its free variables. The referencing environment binds the nonlocal names to the corresponding variables in scope at the time the closure is created, additionally extending their lifetime to at least as long as the lifetime of the closure itself. 

When the closure is entered at a later time, possibly from a different scope, the function is executed with its non-local variables referring to the ones captured by the closure.

    var myObject = function() {
        var value = 0;

        return {
            increment: function(inc) {
                value += typeof inc === 'number' ? inc : 1;
            },
            getValue: function() {
                return value;
            }
        };
    }();

*Snippet 1: Closures in JavaScript*
