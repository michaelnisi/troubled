// This module is the server of my site.

// Require external dependecies.
var http = require('http');
var filed = require('filed');
var path = require('path');
var readFile = require('fs').readFile;
var bake = require('blake').bake;
var publish = require('./publish');

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
    var isPublish = req.url === config.hook;   

    if (isPublish) {
      return publish(config, req, resp, function (err) {
        console.log(err || 'Published on %s', new Date()); 
      });
    }

    if (req.url != '/' && !ext) {
      file += '.html';
    } else if (!ext) {
      file += '/';
    }

    req.pipe(filed(file)).pipe(resp);
  }).listen(config.port, config.ip); 
};
