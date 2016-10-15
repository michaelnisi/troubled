{
  "title": "Exports",
  "description": "Node Module’s exports and module.exports are the same, except when they are not.",
  "template": "article.pug",
  "date": "2014-07-14",
  "path": "2014/07"
}

IO AND MODULES are the two defining things Node brings to the table. This quick post is about module authoring in Node. Modules provide scope and efficient code sharing. Code in a Node module runs in its own scope and the module exports a clearly defined interface which, in JavaScript of course, is an `Object`—or two objects rather, raising a classical question in Node:

What is the difference between `exports` and `module.exports`?

Consulting the [docs](http://nodejs.org/api/modules.html#modules_module_exports):

> The `module.exports` object is created by the Module system. Sometimes this is not acceptable; many want their module to be an instance of some class. To do this assign the desired export object to `module.exports`. Note that assigning the desired object to `exports` will simply rebind the local `exports` variable, which is probably not what you want to do.

Meaning, initially `exports` and `module.exports` are the same. Once you assign something else to exports—not the same anymore—duh! This explains why you commonly see:

```js
module.exports = exports = Something

function Something () {
  // Details
}
```

Folks assign `module.exports` and `exports` simultaneously to allow continious use of the `exports` alias.

`module.exports` is the `Object` received by requiring your module, while `exports` is an alias to the `module.exports` created by the Module system—it`s one of those sugary conveniences that shouldn’t exist in the first place. I recommend to ignore it entirely, complying with the [docs](http://nodejs.org/api/modules.html#modules_exports_alias):

> As a guideline, if the relationship between `exports` and `module.exports` seems like magic to you, ignore `exports` and only use `module.exports`.

There’s more to say about modules, but today I’d rather end on a tangent: Avoid cyclic dependencies! Cyclic dependencies manifest poorly designed modularity—[SoC](http://en.wikipedia.org/wiki/Separation_of_concerns).
