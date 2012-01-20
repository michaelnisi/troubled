var http = require('http');
var blake = require('/home/ubuntu/blake/lib/blake.js');
var gits = require('/home/ubuntu/node_modules/gits/main.js');

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
		
		gits.git('/home/ubuntu/michaelnisi', ['pull'], function () {
			blake.main(['/home/ubuntu/michaelnisi', 
					    '/var/www/michaelnisi']);
		});
	});
	
	response.writeHead(200);
	response.end();
});

server.listen(3000, '127.0.0.1');
