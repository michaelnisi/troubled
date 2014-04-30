
// article - generate article page

var compile = require('./compile')
  , locals = require('./getLocals')

module.exports = function(item, cb) {
  var result = compile(item)(locals(item))
  return cb(null, result)
}
