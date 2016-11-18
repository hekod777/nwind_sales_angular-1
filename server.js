var server = require('http').createServer(require('./app'));
var port = process.env.PORT || 3000;
var db = require('./db');
var Room = require('./db').models.Room;
var io = require('socket.io')(server);
var chalk = require('chalk');

// if(process.env.SYNC){
// 	db.sync()
// 	.then(function(){
// 		console.log('db synced');
// 	})
// 	.catch(function(err){
// 		console.log(err);
// 	});
// }


if(100>1){
	db.sync()
	.then(function(){
		console.log('db synced');
	})
	.catch(function(err){
		console.log(err);
	});
}



io.on('connection', function(socket){

	socket.on('createRoom', function(data){
		console.log(data);
		Room.create({ name: data.roomId })
			.then(function(room){
				console.log(chalk.green('Room Created', chalk.magenta(data.roomId)));
			});
	})
	// putting these here for now.
	// console.log(chalk.blue(socket.id, 'connected'));
});

io.on('disconnect', function(socket){
	// putting these here for now
	// console.log(socket.id, 'disconnected');
});

server.listen(port, function(){
	console.log('listening to port ' + port);
});