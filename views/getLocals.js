(function() {
  var markdown;

  markdown = require('markdown').markdown;

  module.exports = function(item) {
    return {
      title: item.header.title,
      description: item.header.description,
      content: markdown.toHTML(item.body),
      link: item.link,
      date: item.date,
      time: item.date.getTime(),
      pubDate: item.pubDate,
      dateString: item.dateString
    };
  };

}).call(this);
