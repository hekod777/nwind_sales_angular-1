var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL);

db.authenticate().then(function(result){
	console.log('db connection successful');
});

var User = db.define('user', {
});

var Room = db.define('room', {
});

var sync = function(){
	return db.sync({});
};


module.exports = {
	sync: sync
};