{
  "title": "Exploring GraphQL with Apollo",
  "description": "GraphQL encodes a uniform language, type system, and philosophy.",
  "template": "article.pug",
  "date": "2019-02-07",
  "path": "2019/02"
}

A coding task, within a job application recently, gave me the opportunity to try GraphQL. Looking at clients for iOS, I chose Apollo and built [Swifters](https://github.com/michaelnisi/swifters), a little app that lists Swift users on GitHub. But its main purpose, of course, has been exploring GraphQL with Apollo while landing the job.

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

But let’s review aforementioned iOS application that uses [Apollo iOS](https://www.apollographql.com/docs/ios/), a strongly type, caching GraphQL client for native iOS apps. This app lists [Swifters](https://github.com/michaelnisi/swifters). No, not sheep, housekeepers neither, but Taylor Swift fans on [GitHub](https://github.com/search?q=swift&type=Users).

…

By the way, I’ve been lucky to not get that job. It didn’t fit.
