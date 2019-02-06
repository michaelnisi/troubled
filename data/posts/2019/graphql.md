{
  "title": "Exploring GraphQL with Apollo",
  "description": "GraphQL encodes a uniform language, type system, and philosophy.",
  "template": "article.pug",
  "date": "2019-02-06",
  "path": "2019/02"
}

A coding task, within a job application recently, gave me the opportunity to try GraphQL. Looking at clients for iOS, I chose Apollo and built [Swifters](https://github.com/michaelnisi/swifters), a little app that lists Swift users on GitHub. But its main purpose, of course, has been exploring GraphQL with Apollo and to land the job, of which, unfortunately, only the first part panned out—in hindsight, I prefer this outcome.

[GraphQL](https://graphql.org) is a query language for APIs. Interacting with a GraphQL endpoint, you describe what you need in your query and get exactly that, with the result’s fields mirroring the query’s. A single GraphQL endpoint may aggregate data from many resources. Its typed schema can replace versioning, which, especially for microservices, is error prone.

[Apollo iOS](https://www.apollographql.com/docs/ios/) is a strongly-typed, caching GraphQL client.
