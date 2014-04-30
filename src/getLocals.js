
// locals - make locals object

var markdown = require('markdown').markdown

module.exports = function (item) {
  return {
    title: item.header.title
  , description: item.header.description
  , content: markdown.toHTML(item.body)
  , name: item.name
  , link: item.link
  , date: item.date
  , time: item.date.getTime()
  , pubDate: item.pubDate
  , dateString: item.dateString
  }
}
