(function() {
  var compile;

  compile = require('./compile.js');

  module.exports = function(item, items, shift, callback) {
    var hasItems, html, latestItem, length, locals, threshold, toArchive;
    if (shift == null) shift = false;
    toArchive = compile(item);
    hasItems = (items != null) && items.length > 0;
    length = items.length;
    if (shift) {
      latestItem = items.shift();
    } else {
      latestItem = null;
    }
    threshold = Math.ceil(length / 2);
    locals = {
      title: item.header.title,
      items: items,
      dateString: items[0].dateString,
      hasItems: hasItems,
      latestItem: latestItem,
      firstColumnItems: items.slice(0, threshold),
      secondColumnItems: items.slice(threshold)
    };
    html = toArchive(locals);
    return callback(null, html);
  };

}).call(this);
