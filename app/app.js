var http = require('http');

var server;

server = http.createServer(function (request, response) {
	if (request.method != 'POST') {
		response.end('Nope');
		return;
	}

	// Continue if request comes from github
	
	var data, payload;

	data = '';

	request.on('data', function (chunk) {
		data += chunk;
	});

	request.on('end', function () {
		if (data) {
			payload = JSON.parse(data).payload;
			console.log(payload);
		}
	});
	
	response.writeHead(200);
	response.end('Yes');
});

server.listen(3000, '127.0.0.1');
