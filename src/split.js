
// split - add two columns of articles

var compile = require('./compile')

function locals (item, items, shift) {
  var latestItem = shift ? items.shift() : null
    , threshold = Math.ceil(items.length / 2)
    , hasItems = items.length > 0
    , firstColumnItems = hasItems ? items.slice(0, threshold) : null
    , secondColumnItems = hasItems ? items.slice(threshold) : null

  item.description = item.header.description
  item.items = items
  item.hasItems = hasItems
  item.latestItem = latestItem
  item.firstColumnItems = firstColumnItems
  item.secondColumnItems = secondColumnItems

  return item
}

module.exports = function (item, items, shift, cb) {
  var html = compile(item)(locals(item, items, !!shift))
  return cb(null, html)
}
