

//watch -n1 "netstat -an | grep 3000"
//netstat -an | grep "0 127.0.0.1:3000" | wc -l
//watch -n1 "netstat -an | grep \"0 127.0.0.1:3000\" | grep \"TIME_WAIT\"| wc -l"
//watch -n1 "netstat -an | grep \"0 127.0.0.1:3000\" | wc -l"
//watch -n1 "netstat -an | grep \"0 127.0.0.1:3000\" | grep \"ESTABLISHED\"| wc -l"
//netstat -anp |grep 3000 |wc -l
//netstat -anp |grep 'tcp\|udp' | awk '{print $5}' | sed s/::ffff:// | cut -d: -f1 | sort | uniq -c | sort -n
//~/env/nodejs/socket.io-benchmark$ node benchmark.js 120 60
//node ~/env/nodejs/socket.io-benchmark/benchmark.js 120 60

var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
     console.log('a user connected');
     socket.on('chatmessage', function(msg){
     	socket.broadcast.emit('hi');
     	io.emit('chatmessage', msg);
        console.log('message: ' + msg);
     });
     socket.on('disconnect', function(){
        console.log('user disconnected');
     });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});