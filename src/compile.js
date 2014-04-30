
// compile - make compilation function

var jade = require('jade')

function opts (item) {
  return {
    filename: item.templatePath
  , pretty: true
  }
}

module.exports = function (item) {
  return jade.compile(item.template, opts(item))
}
