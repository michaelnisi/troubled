var http = require('http');
var blake = require('blake');
var gits = require('/home/ubuntu/node_modules/gits/main.js');
var reflect = require('/home/ubuntu/reflector/index.js').main;

var INPUT = '/home/ubuntu/michaelnisi';
var TEMPLATES = INPUT + '/templates/';
var OUTPUT = '/var/www/michaelnisi';

var server;

server = http.createServer(function (request, response) {
	if (request.method !== 'POST') {
		response.end();
		return;
	}

	// Continue if request comes from github

	var data, payload;

	data = '';

	request.on('data', function (chunk) {
		data += chunk;
	});

	request.on('end', function () {
		if (!data) {
			return;
		}

		var value;

		value = data.split('payload=')[1];

		if (!value) {
			return;
		}

		payload = JSON.parse(unescape(value) || null);

		if (!payload) {
			return;
		}

		console.log(payload);

		// Analyze payload, bake granuarly.

		gits.git(INPUT, ['pull'], function (error) {
			blake.bake(INPUT, OUTPUT, function(error) {
				reflect(TEMPLATES, OUTPUT);
			});
		});
	});

	response.writeHead(200);
	response.end();
});

server.listen(3000, '127.0.0.1');

setInterval(function () {
	reflect(TEMPLATES, OUTPUT);
}, 1000 * 60 * 60);
