var server = require('http').createServer(require('./app'));
var port = process.env.PORT || 3000;
var db = require('./db');

if(process.env.SYNC){
	db.sync()
	.then(function(){
		console.log('db synced');
	})
	.catch(function(err){
		console.log(err);
	});
}

server.listen(port, function(){
	console.log('listening to port ' + port);
});