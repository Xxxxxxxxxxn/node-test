const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = http.createServer();
const events = require('events');

const EventEmitter = new events.EventEmitter();

server.on('request', (req, res) => {
	let pathName = req.url;
	if (pathName === '/') {
		pathName = 'index.html';
	}

	const extName = path.extname(pathName);
	if (pathName !== '/favicon.ico') {
		console.log('0');
		fs.readFile(`./staticData/${pathName}`, (err, data) => {
			EventEmitter.emit('xx', '1');
			if (err) {
				console.log('出错了');
				fs.readFile('./staticData/404.html', (err, data) => {
					if (err) {
						console.log('出错了');
					} else {
						res.writeHead(404);
						res.write(data);
						res.end();
					}
				});
			} else {
				const type = getType(extName);
				res.writeHead(200, {'content-type': `${type};chartset='utf-8'`});
				res.write(data);
				res.end();
			}
		});
		EventEmitter.on('xx', data => {
			// 2
			console.log(data);
		});
	}
});

const getType = extName => {
	const typeMap = {
		'.html': 'text/html',
		'.js': 'text/js',
		'.css': 'text/css',
	};

	return typeMap[extName];
};

server.listen(3000, () => {
	console.log('sever start');
});
