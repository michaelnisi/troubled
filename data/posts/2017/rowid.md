{
  "title": "Choose your index",
  "description": "I wonder, why I don‘t read more about clustered indexes in SQLite.",
  "template": "article.pug",
  "date": "2017-10-15",
  "path": "2017/10"
}

Previously, all SQLite tables, except virtual ones, were [rowid tables](https://www.sqlite.org/rowidtable.html), since version 3.8.2, tables [without rowid](https://www.sqlite.org/withoutrowid.html) are available.

Looking at schemas, I'm encountering, this quote from the documentation is remarkable:

> In an elegant system, all tables would behave as WITHOUT ROWID tables even without the WITHOUT ROWID keyword. However, when SQLite was first designed, it used only integer rowids for row keys to simplify the implementation. This approach worked well for many years. But as the demands on SQLite grew, the need for tables in which the PRIMARY KEY really did correspond to the underlying row key grew more acute. The WITHOUT ROWID concept was added in order to meet that need without breaking backwards compatibility with the billions of SQLite databases already in use at the time (circa 2013).

So, ignore the primary key gospel, choose your index wisely.
