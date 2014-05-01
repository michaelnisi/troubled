
// locals - make locals object

var marked = require('marked')

module.exports = function (item) {
  return {
    title: item.header.title
  , description: item.header.description
  , content: marked(item.body)
  , name: item.name
  , link: item.link
  , date: item.date
  , time: item.date.getTime()
  , pubDate: item.pubDate
  , dateString: item.dateString
  }
}
