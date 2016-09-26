var db = require('./_db');

var Region = require('./region');

var SalesPerson = require('./salesPerson');

var sync = function(){
	return db.sync({ force: true });
};


module.exports = {
	models: {
		Region: Region,
		SalesPerson: SalesPerson
	},
	sync: sync
};
