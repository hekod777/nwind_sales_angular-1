var db = require('./_db');

var Region = db.define('region', {
	zip: {
		type: db.Sequelize.STRING
	}
});

module.exports = Region;
