{
"title": "GraphQL with Apollo iOS",
"description": "GraphQL encodes a uniform language, type system, and philosophy.",
"template": "article.pug",
"date": "2019-02-08",
"path": "2019/02",
"image": "img/graphql_large_card.png"
}

Recently, I finally got around to try GraphQL. I know, right? Ready to jump on the bandwagon—it’s a developer [mega-trend](https://blog.apollographql.com/highlights-from-graphql-summit-2018-30a766291691)—I picked Apollo iOS and built [Swifters](https://github.com/michaelnisi/swifters), a little app that lists Swift users on GitHub. Although incredibly useful in its own right, its purpose is to explore GraphQL, evaluating its declarative—as opposed to the imperative REST—architecture.

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) is procedural and if you have ever maintained an app which talks to a bunch of microservices, you know the pain. Coordinating servers and clients, even if it’s the same person or team working on them, is a mess—eventually leading to conservativism. With too many moving parts comes a fear of change.

> REST isn't a fit for modern applications—[Why is GraphQL important?](https://www.apollographql.com/why-graphql)

And to take the biscuit, imagine doing this with a dynamic language, server side and client side. But hey, who does that, right? Using Swift, statically typed, cut with functional programming, we are pretty safe. But how can we safely integrate with remote APIs, so we can embrace change?

#### We need a type-safe contract between client and server

[GraphQL](https://graphql.org) is a query language for APIs, originally created at Facebook in 2012. Interacting with a GraphQL endpoint, you describe what you need in your query and get exactly that. The result reflects the structure of the query.

A single GraphQL endpoint may aggregate data from many resources. Its typed _schema_ can replace versioning, which is flimsy anyways, especially for microservices, with people ending up bumping version numbers wholesale in unison. Do you even [semver](https://semver.org)?

[Apollo iOS](https://www.apollographql.com/docs/ios/) is a strongly-typed, caching GraphQL client.

In addition to the reference implementation in [JavaScript](https://github.com/graphql/graphql-js), there are server libraries for many [languages](https://graphql.org/code/). I want to point out the excellently documented [graphql-erlang](https://github.com/shopgun/graphql-erlang). If your looking for a server integration, [@matteocollina](https://twitter.com/matteocollina) has written an [adapter](https://github.com/mcollina/fastify-gql) for [Fastify](https://github.com/fastify/fastify).

You don’t need a complex client to hit a GraphQL endpoint. Here’s GitHub:

```sh
$ curl https://api.github.com/graphql
```

Responding with:

```js
{
  "message": "This endpoint requires you to be authenticated.",
  "documentation_url": "https://developer.github.com/v3/#authentication"
}
```

After you have [created](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql) your OAuth token, try logging in bearing the `<token>`.

```sh
$ curl -H "Authorization: bearer <token>" -X POST -d " \
 { \
   \"query\": \"query { viewer { login }}\" \
 } \
" https://api.github.com/graphql
```

Voilà!

```js
{"data":{"viewer":{"login":"<your_github_login>"}}}
```

Exploring APIs with [curl](https://curl.haxx.se) is fun, but to actually build something, of course, you need a client. For JavaScript, there are [Relay](https://facebook.github.io/relay/), [Apollo](https://www.apollographql.com/docs/react/), and many [more](https://graphql.org/code/#javascript-1). For [other languages](https://graphql.org/code/#graphql-clients) as well.

#### Making the difference

Before returning to the aforementioned app, a few words on iOS collection views.

Creating adaptive UIs, collection views and table views can be used to structure apps. This requires rich data sources providing these views with data. Correctly built, with diffing and `performBatchUpdates(_:completion:)`, flexible app structures emerge.

Detailed understanding of `performBatchUpdates(_:completion:)` is essential for building this kind of apps. I recommend taking [A Tour of UICollectionView](https://developer.apple.com/videos/play/wwdc2018/225/).

Every iOS developer has implemented a diffing algorithm for updating collection views or table views, one way or another. Looking around, I like [DeepDiff](https://github.com/onmyway133/DeepDiff). In fact, I like it so much that I have extracted its `diff` function into a single [file](https://github.com/michaelnisi/swifters/blob/master/Swifters/ds/diff.swift)—386 lines of code.

I’m excited about the recent [Ordered Collection Diffing](https://github.com/apple/swift-evolution/blob/master/proposals/0240-ordered-collection-diffing.md) proposal, describing additions to the Swift Standard Library that provide an interchange format for diffs as well as diffing/patching functionality for appropriate collection types.

#### Diving in

For [Swifters](https://github.com/michaelnisi/swifters), I’ve chosen [Apollo iOS](https://www.apollographql.com/docs/ios/), a strongly typed, caching GraphQL client for native iOS apps. The app repo contains detailed [installation](https://github.com/michaelnisi/swifters#installation) instructions—here’s just a quick intro, independent from the app, for exploring the Apollo command line tool. Let’s install it with npm. In a new directory, do:

```sh
$ npm i apollo
```

We can try it locally using [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner), an npm package runner.

```sh
$ npx apollo
```

```sh
Command line tool for Apollo GraphQL

VERSION
  apollo/1.9.2 darwin-x64 node-v8.12.0

USAGE
  $ apollo [COMMAND]

COMMANDS
  codegen  Generate static types for GraphQL queries. Can use the published schema in Apollo Engine or a downloaded schema.
  help     display help for apollo
  queries  Checks your GraphQL operations for compatibility with the server. Checks against the published schema in Apollo Engine.
  schema   Check a schema against the version registered in Apollo Engine.
```

Type `help` followed by a command name to explore the tool, for example:

```sh
$ npx apollo help schema
```

#### Schemas and Types

> A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type.

These types are defined in a _schema_, a contract with clients. Let’s download the _schema_ of the GitHub GraphQL API, authenticating with the OAuth token from above.

```sh
npx apollo schema:download --endpoint=https://api.github.com/graphql --header="Authorization: <token>"
```

And with that, we have just downloaded the 45K LOC _schema_ file of the GitHub GraphQL API v4. 😮 Peeking into the file, we find the GitHub API Graph expressed in JSON, not for humans though, but for [machines](https://developer.github.com/v4/guides/intro-to-graphql/#discovering-the-graphql-api) to read. GraphQL is [introspective](https://graphql.org/learn/introspection/), you can ask a _schema_ about itself. For example, this query JSON would list all GitHub types:

```js
{
  "query": "{ __schema { types { name } } }"
}
```

```sh
$ curl -sSH "Authorization: bearer <token>" -X POST -d '{ "query": "{ __schema { types { name } } }" }' https://api.github.com/graphql | json -ga data.__schema.types | json -ga name | wc -l
```

```sh
482
```

Wow, with almost 500 different types, this API is vast. ✨

Naturally, there are more convenient ways of exploring GraphQL. [GraphiQL](https://github.com/graphql/graphiql) lets you write, validate, and test GraphQL queries in your [browser](https://developer.github.com/v4/explorer/).

#### First impressions

This article is getting lengthy. Why not end it with my unreflected notes? They are kind of dumb, but hey, I need a breather and you can read the [code](https://github.com/michaelnisi/swifters) if you just can’t get enough. Here’s what I’ve jotted down building the app last December.

> Making myself familiar with Apollo iOS, what troubles me is the tight coupling of view controllers and the remote API, merging access and storage. On the other hand, [repositories](https://www.martinfowler.com/eaaCatalog/repository.html) have the same surface. Apollo wants to remove the serialization layer, which can be a millstone around the neck of developers, rendering them hesitant to change. Propagating an adjustment from the server onto the screen is often laborious and requires coordination between different teams.

> But the service logic leaks into your view controllers. Is that modern? Maybe. The `schema.json` is a contract. I have to read up on GraphQL API versioning.

> Apollo does not only remove serialization, but also builds a local graph. I decided to go all in for this little experiment and query from my collection view data sources, which accompanies nicely my other dogma for this demo: collection views only.

_Three days later_

> I’m impressed. After passing the intial ramp, acquiring a rudimentary understanding of GraphQL and setting up Apollo iOS, it has been a downhill ride—thrilling and fast. Building an app by modeling queries like clay is incredibly effective. Development can get pretty spontaneous that way, while still being safe, Type-Safe.

_A week later_

> Do I still believe in REST? I have yet to experience implementing GraphQL server, but what I have seen so far, from the client perspective, indicates strongly that GraphQL with Apollo is a great way for building and growing apps. All parts fell into place quite naturally. Intuitive decisions were mostly right. My reading matter for the next couple of weeks is set. 📚

_I have questions_

> Offline first? How would we persist the graph cache? How does memory management of the graph work? Why is `GraphQLFragment` not `Hashable`? And what’s up with those memory leaks?

#### Bringing things together again

After the final monolith has been broken down into microservices, we are introducing a new layer to bring things together again.

> This new layer brings all of a company's app data and services together in one place, with one consistent, secure, and easy-to-use interface, so that anyone can draw upon it with minimal friction

Read on, this is a quote from [Principled GraphQL](https://principledgraphql.com).
