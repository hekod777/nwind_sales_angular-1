var db = require('./_db');

var SalesPerson = db.define('salesPerson', {
	name: {
		type: db.Sequelize.STRING
	}
});

module.exports = SalesPerson;
