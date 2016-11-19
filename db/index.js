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
	},
});

var Dog = db.define('dog',{
	name:{
		type:Sequelize.STRING,
	}
});

var Channel = db.define('channel', { // this channel database is the one we need to use
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	view: {
		type: Sequelize.INTEGER,
		defaultValue:0,
	},
	category:{
		type:Sequelize.STRING,
	},
	tags: {
		type: Sequelize.ARRAY(Sequelize.TEXT),
	},
	coverimage:{
		type:Sequelize.STRING,
	},
});




var sync = function(){
	return db.sync({});
};


module.exports = {
	models: {
		Room: Room,
		User: User,
		Dog: Dog,
		Channel: Channel,
	},
	sync: sync
};