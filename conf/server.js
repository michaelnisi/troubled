// This module is the server of my site.

// Require external dependecies.
var http = require('http');
var filed = require('filed');
var path = require('path');
var readFile = require('fs').readFile;
var bake = require('blake').bake;
var spawn = require('child_process').spawn;

// Spawn child process with specified path and execute git pull.
var pull = function (path, callback) {
  spawn('git', ['pull'], { cwd:path }).on('exit', function (code) {
    return callback(code === 0 ? null : new Error(code));
  });
};

// Start the site.
module.exports = function (config) {
  var isInvalid
    = !config || !config.port || !config.input || !config.output;

  if (isInvalid) {
    throw new Error('Invalid configuration');
  }

  // Create and start the server.
  http.createServer(function (req, resp) {
    var file = path.resolve(config.output + req.url);
    var ext = file.split('.')[1];
    var isPublish = req.url == '/publish';   
    
    if (isPublish) {
      return publish(config, req, resp);
    }

    if (req.url != '/' && !ext) {
      file += '.html';
    } else if (!ext) {
      file += '/';
    }

    req.pipe(filed(file)).pipe(resp);
  }).listen(config.port, config.ip); 
  
  reflect(config);
};

var reflect = function (config) {
  return config.callback ? config.callback(null) : null;
};

var publish = function (config, request, response, callback) {
  if (request.method !== 'POST') {
    response.end();
    return;
  }

  var data = '';

  request.on('data', function (chunk) {
    data += chunk;
  });

  request.on('end', function () {
    if (!data) {
      return;
    }

    var value = data.split('payload=')[1];

    if (!value) {
      return;
    }

    try {
      var payload = JSON.parse(unescape(value) || null);
    } catch(err) {
      return;
    }

    if (!payload) {
      return;
    }

    console.log(payload);

    pull(config.input, function (error) {
      bake(config.input, config.output, function (error) {
        reflect(config);
      });
    });
  });

  response.writeHead(200);
  response.end();
};
