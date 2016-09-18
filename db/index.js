var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL);

db.authenticate().then(function(result){
	console.log('db connection successful');
});

var Region = db.define('region', {
	zip: {
		type: Sequelize.INTEGER
	}
});

var SalesPerson = db.define('salesPerson', {
	name: {
		type: Sequelize.STRING
	}
});

var sync = function(){
	return db.sync({});
};


module.exports = {
	models:{
		Region: Region,
		SalesPerson: SalesPerson
	},
	sync: sync
};