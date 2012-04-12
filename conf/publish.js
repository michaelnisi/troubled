// Require external dependencies.
var spawn = require('child_process').spawn;
var bake = require('blake').bake;

// Spawn child process with specified path and execute git pull.
var pull = function (path, callback) {
  spawn('git', ['pull'], { cwd: path }).on('exit', function (code) {
    return callback(code === 0 ? null : new Error(code));
  });
};

// We do very little to secure this post-receive hook. We assume that the 
// URL of the post-receive hook is secret—not '/publish'. Here we check
// wether the request is a post request from one of GitHub's IP addresses
// and if it contains a payload object.
var validate = function (request, callback) {
  console.log(request);

  if (request.method != 'POST') {
    return callback(false);
  }
  
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

// If the request is valid, pull latest version of input data, generate the
// site from it, and apply callback. If the request is not qualified for
// publication, apply callback with error.
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
