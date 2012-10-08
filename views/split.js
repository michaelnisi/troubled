(function() {
  var compile;

  compile = require('./compile.js');

  module.exports = function(item, items, shift, callback) {
    var dateString, firstColumnItems, hasItems, html, latestItem, locals, secondColumnItems, threshold, toArchive;
    if (shift == null) shift = false;
    toArchive = compile(item);
    dateString = items[0].dateString;
    latestItem = shift ? items.shift() : null;
    hasItems = items.length > 0;
    threshold = Math.ceil(items.length / 2);
    firstColumnItems = hasItems ? items.slice(0, threshold) : null;
    secondColumnItems = hasItems ? items.slice(threshold) : null;
    locals = {
      title: item.header.title,
      items: items,
      dateString: dateString,
      hasItems: hasItems,
      latestItem: latestItem,
      firstColumnItems: firstColumnItems,
      secondColumnItems: secondColumnItems
    };
    html = toArchive(locals);
    return callback(null, html);
  };

}).call(this);