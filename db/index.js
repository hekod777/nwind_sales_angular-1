var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL);

db.authenticate().then(function(result){
	console.log('db connection successful');
});

var User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var Room = db.define('room', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var sync = function(){
	return db.sync({});
};


module.exports = {
	models: {
		Room: Room,
		User: User
	},
	sync: sync
};