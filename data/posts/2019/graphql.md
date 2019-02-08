{
  "title": "GraphQL with Apollo iOS",
  "description": "GraphQL encodes a uniform language, type system, and philosophy.",
  "template": "article.pug",
  "date": "2019-02-08",
  "path": "2019/02"
}

Recently, I had a chance to try GraphQL on iOS. After a quick search for a client library, I picked Apollo iOS and built [Swifters](https://github.com/michaelnisi/swifters), a little app that lists Swift users on GitHub. But its main purpose, of course, has been to compare the imperative REST approach to the declarative GraphQL way.


REST is procedural and if you have ever maintained an app which talks to a bunch of microservices, you know the pain. Coordinating servers and clients, even if it’s the same person or team working on them, is a mess and eventually develops into conservatism—fear of change.

> REST isn't a fit for modern applications—[Why is GraphQL important?](https://www.apollographql.com/why-graphql)

[GraphQL](https://graphql.org) is a query language for APIs, originally created at Facebook in 2012. Interacting with a GraphQL endpoint, you describe what you need in your query and get exactly that, with the result’s fields mirroring the query’s. A single GraphQL endpoint may aggregate data from many resources. Its typed schema can replace versioning, which, especially for microservices, is error prone.

[Apollo iOS](https://www.apollographql.com/docs/ios/) is a strongly-typed, caching GraphQL client.

There are many GraphQL [implementations](https://graphql.org/code/). For example, server-side frameworks for [JavaScript](https://graphql.org/graphql-js/) and [Erlang](https://github.com/shopgun/graphql-erlang).

You don’t need a complex client to hit a GraphQL endpoint. Here’s GitHub:

```
curl https://api.github.com/graphql
```

Responding with:

```js
{
  "message": "This endpoint requires you to be authenticated.",
  "documentation_url": "https://developer.github.com/v3/#authentication"
}
```

After you have [created](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql) your OAuth token, try logging in bearing the `<token>`.

```
curl -H "Authorization: bearer <token>" -X POST -d " \
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

[![Swift](/img/taylor.gif "Swift")](https://swift.org)

But let’s review aforementioned iOS application that uses [Apollo iOS](https://www.apollographql.com/docs/ios/), a strongly typed, caching GraphQL client for native iOS apps. Our app lists [Swifters](https://github.com/michaelnisi/swifters). No, not sheep, housekeepers neither, but Taylor Swift fans on [GitHub](https://github.com/search?q=swift&type=Users).

Creating adaptive UIs, collection views and table views can be used to structure apps. This requires rich data sources providing these views with data. Correctly built, with diffing and `performBatchUpdates(_:completion:)`, flexible app structures emerge.

Detailed understanding of `performBatchUpdates(_:completion:)` is essential for building this kind of apps. I recommend taking [A Tour of UICollectionView](https://developer.apple.com/videos/play/wwdc2018/225/).

Every iOS developer has implemented a diffing algorithm for updating collection views or table views, one way or another. Looking around, I found [DeepDiff](https://github.com/onmyway133/DeepDiff) and extracted the diffing into a single, 386 LOC [file](https://github.com/michaelnisi/swifters/blob/master/Swifters/ds/diff.swift), to be flexible at call-site, not knowing how I was going to apply it yet.

I’m excited about the recent [Ordered Collection Diffing](https://github.com/apple/swift-evolution/blob/master/proposals/0240-ordered-collection-diffing.md) proposal, describing additions to the Swift Standard Library that provide an interchange format for diffs as well as diffing/patching functionality for appropriate collection types.

#### Diving in

The app repo contains detailed installation instructions, here’s just a quick intro, independent from the app. Firstly, are installing the Apollo command line tool.

```
$ npm i apollo
```

We can try it locally using npx.

```
$ npx apollo
```

```
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

#### Schemas and Types

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. These types are define in a schema, a contract with clients.

Let’s download said contract for the GitHub API.

```
npx apollo schema:download --endpoint=https://api.github.com/graphql --header="Authorization: <token>"
```

And with that, we have just downloaded the 45K LOC schema file of the GitHub GraphQL API v4. 😮

#### First look at Apollo iOS

Apollo uses [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner), which is neat. npx is a command-line tool from npm that lets you execute commands locally, or from a central cache, installing any packages needed.

Reading the Apollo documentation, my main concern with Apollo’s approach is the tight coupling between view controllers and the remote API, merging access and storage. On the other hand, [repositories](https://www.martinfowler.com/eaaCatalog/repository.html) have the same surface and its purpose is removing the serialization layer, which can be a millstone around the neck of developers, rendering them hesitant to change. Propagating an adjustment from the server onto the screen is often laborious and often requires coordination between different teams.

But the service logic leaks into your view controllers. Is that modern? Maybe. The `schema.json` is a contract. I have to read up on GraphQL API versioning.

Apollo does not only remove serialization, but also builds a local graph. I decided to go all in for this little experiment and query from my collection view data sources, which accompanies nicely my other dogma for this demo: collection views only.

#### Three days later

Three days later, I’m impressed. After passing the intial ramp, aquiring a rudimentary understanding of GraphQL and setting up Apollo, it has been a downhill ride—thrilling and fast. Building an app by modeling queries like clay is incredibly effective. Development can get pretty spontaneous that way. For large apps, of course, this may also become a problem, despite all being statically typed, which is pretty amazing by the way.

#### A week later

A week later, do I still believe in REST? I haven’t experienced implementing a GraphQL server—[graphql-erlang](https://github.com/shopgun/graphql-erlang) looks fantastic—but from the client perspective and what I’ve seen so far, I would recommend GraphQL. All parts fell into place quite naturally. Intuitive decisions were mostly right. My reading matter for the next couple of weeks is set. 📚

#### I have questions

- Offline first? How would we persist the graph cache?
- How does memory management of the graph work?
- Why is `GraphQLFragment` not `Hashable`?
- What’s up with these memory leaks?
