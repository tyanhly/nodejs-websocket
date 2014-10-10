var io = require('socket.io-client');

function user(host, port) {
    var start = new Date();
    var socket = io.connect('http://' + host + ':' + port, {'force new connection': true});

    socket.on('connect', function() {
		
       // message will be echoed by server
        socket.send('connect');

	    socket.on('chatmessage', function(message) {
	      console.log(new Date() - start)
	      socket.send('debug has received:' + message);
	    });

  	});
};

var argvIndex = 2;

var users = parseInt(process.argv[argvIndex++]);
var host = process.argv[argvIndex++] ? process.argv[argvIndex - 1]  : 'localhost';
var port = process.argv[argvIndex++] ? process.argv[argvIndex - 1]  : '3000';
j=0;
for(var i=0; i<users; i++) {
    setTimeout(function() {
	    console.log('Create user: ' + j++);
	    user(host, port); 
	}, 
	1000);
};
