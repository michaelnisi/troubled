// This module publishs the site.

// Require external dependencies.
var spawn = require('child_process').spawn;
var bake = require('blake').bake;

// Spawn child process with specified path and execute git pull.
var pull = function (path, callback) {
  spawn('git', ['pull'], { cwd: path }).on('exit', function (code) {
    return callback(code === 0 ? null : new Error(code));
  });
};

//
var parse = function (request, callback) {
  console.log(request);

  var data = '';

  request.on('data', function (chunk) {
    data += chunk;
  });

  request.on('end', function () {
    if (!data) {
      return callback(false);
    }

    var ip = request.connection.remoteAddress;
    var isIP = ip === '207.97.227.253' || ip === '50.57.128.197';
            
    if (!isIP) {
      return callback(false);
    } 

    var value = data.split('payload=')[1];

    if (!value) {
      return callback(false);
    }

    try {
      var payload = JSON.parse(unescape(value) || null);
    } catch(err) {
      return callback(false);
    }

    if (!payload) {
      return callback(false);
    }

    console.log(payload);

    return callback(true);
  });
};

var validate = function (request, callback) {
  var isPost = request.method === 'POST';

  
  if (isPost) {
    parse(request, function (isGitHub) {
      callback(isGitHub);
    });    
  } else {
    callback(false);
  }
};

module.exports = function (config, request, response, callback) {
  validate(request, function (isValid) {
    response.writeHead(200);
    response.end();
    
    if (!isValid) {
      return callback(new Error('Invalid post-receive request'));
    } else {
      pull(config.input, function (error) {
        bake(config.input, config.output, function (err) {
          callback(err);
        });
      });    
    }
  });
};
