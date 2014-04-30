
// about - generate about page

var compile = require('./compile')
  , markdown = require('markdown').markdown
  , getLocals = require('./getLocals')

function locals (item) {
  var locals = getLocals(item)
  locals.icons = item.header.icons
  return locals
}

module.exports = function(item, cb) {
  return cb(null, compile(item)(locals(item)))
}
