{
  "title": "Choose Your Index",
  "description": "Why don’t we see more about clustered SQLite indexes? To rowid, or not to rowid, that is the question.",
  "template": "article.pug",
  "date": "2017-10-15",
  "path": "2017/10"
}

Previously all SQLite tables, except virtual ones, have been [rowid tables](https://www.sqlite.org/rowidtable.html), since version 3.8.2, tables [without rowid](https://www.sqlite.org/withoutrowid.html) are a thing.

Looking at schemas I encounter in the wild, mostly created after 2013, this quote from the documentation strikes me as remarkable:

> In an elegant system, all tables would behave as `WITHOUT ROWID` tables even without the `WITHOUT ROWID` keyword. However, when SQLite was first designed, it used only integer rowids for row keys to simplify the implementation. This approach worked well for many years. But as the demands on SQLite grew, the need for tables in which the `PRIMARY KEY` really did correspond to the underlying row key grew more acute. The `WITHOUT ROWID` concept was added in order to meet that need without breaking backwards compatibility with the billions of SQLite databases already in use at the time (circa 2013).

So, ignore the gospel—[Stack Overflow](https://stackoverflow.com) et al.—choose a modern index.
