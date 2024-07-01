// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var comments = [];

http.createServer(function(req,res) {
	var urlObj = url.parse(req.url,true);
	var pathname = urlObj.pathname;
	if(pathname === '/') {
		fs.readFile('./index.html',function(err,data) {
			if(err) {
				console.log(err);
				res.statusCode = 404;
				res.end('Not Found');
			}else {
				res.setHeader('Content-Type','text/html;charset=utf-8');
				res.end(data);
			}
		});
	}else if(pathname === '/index.css') {
		fs.readFile('./index.css',function(err,data) {
			if(err) {
				console.log(err);
				res.statusCode = 404;
				res.end('Not Found');
			}else {
				res.setHeader('Content-Type','text/css;charset=utf-8');
				res.end(data);
			}
		});
	}else if(pathname === '/index.js') {
		fs.readFile('./index.js',function(err,data) {
			if(err) {
				console.log(err);
				res.statusCode = 404;
				res.end('Not Found');
			}else {
				res.setHeader('Content-Type','application/javascript;charset=utf-8');
				res.end(data);
			}
		});
	}else if(pathname === '/getComments') {
		var json = JSON.stringify(comments);
		res.end(json);
	}else if(pathname === '/postComment') {
		var comment = urlObj.query;
		comment.dateTime = new Date();
		comments.push(comment);
		res.end(JSON.stringify(comment));
	}else {
		fs.readFile('.'+pathname,function(err,data) {
			if(err) {
				console.log(err);
				res.statusCode = 404;
				res.end('Not Found');
			}else {
				var contentType = mime.lookup(pathname);
				res.setHeader('Content-Type',contentType+';charset=utf-8');
				res.end(data);
			}
		});
	}
}).listen(8080,function() {
	console.log('server is listening on 8080');
});