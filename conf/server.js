module.exports = server

var http = require('http')
  , filed = require('filed')
  , path = require('path')
  , readFile = require('fs').readFile
  , publish = require('./publish')
  , poolee = require('poolee')
  , blake = require('blake')

function server (config) {
  var ip = config.ip
    , port = config.port
    , input = config.input
    , output = config.output
    , invalid = !config || !ip || !port || !input || !output

  if (invalid) {
    throw new Error('Invalid configuration')
  }

  http.createServer(function (req, resp) {
    var file = path.resolve(output + req.url)
      , ext = file.split('.')[1]
      , isPublish = req.url === config.hook   

    if (isPublish) {
      return publish(config, req, resp, function (err) {
        console.log(err || 'Published on %s', new Date()) 
      })
    }

    if (req.url != '/' && !ext) {
      file += '.html'
    } else if (!ext) {
      file += '/'
    }

    req.pipe(filed(file)).pipe(resp)
  }).listen(port, ip)

  var tweet = path.resolve(input, 'data', 'tweet.json')
    , likes = path.resolve(input, 'data', 'likes.json')

  setInterval(function () {
    blake(input, output, tweet, likes, function (err) {
      console.log('Published tweet and likes on %s', new Date())
    })
  }, 3600000)

  console.log('Server running at http://%s:%s', ip, port)
}
