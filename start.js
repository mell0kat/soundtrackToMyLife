var chalk = require('chalk');
'use strict';
var express = require('express');
var path =require('path');
var app = express();
// Create a node server instance! cOoL!
var server = require('http').createServer();



var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};



startServer()

server.on('request', app);

app.use(express.static(__dirname));

app.get('/*', function (req, res) {
	console.log('got a request!')
    res.render(path.join(__dirname, '/index.html'));
});
