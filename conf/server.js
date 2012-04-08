var http = require('http');
var filed = require('filed');
var path = require('path');


var ROOT = 'website';

var server = http.createServer(function (req, resp) {
  var file = path.resolve(ROOT + req.url);
  var ext = file.split('.')[1];
  
  if (req.url != '/' && !ext) {
    file += '.html';
  } else if (!ext) {
    file += '/';
  }

  req.pipe(filed(file)).pipe(resp);
});

server.listen(8888, '127.0.0.1');
