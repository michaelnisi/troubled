{
  "title": "Double Negative",
  "description": "In JavaScript we cannot not apply double negation to check if an object exists.",
  "date": "2012-05-15",
  "template": "article.jade",
  "path": "2012/05"
}

TO CHECK IF a thing is a thing I used to write something like this:
    
    function has (obj, key) {
      return obj[key] ? true : false
    }

Recently I realized the obvious; we can combine two logical NOTs to check for NOT `undefined` AND NOT `null`:

    var tap = require('tap')
    
    function has (obj, key) {
      return !!obj[key]
    }
    
    tap.test('has', function (t) {
      t.notOk(has({}, 'cash'), 'should be false')
      t.notOk(has({ cash: undefined }, 'cash'), 'should be false')
      t.notOk(has({ cash: null }, 'cash'), 'should be false')
      t.ok(has({ cash: 100 }, 'cash'), 'should be true')
      t.end()
    })

You don't know what you don't know. 
