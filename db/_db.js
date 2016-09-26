var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL);

db.Sequelize = Sequelize;

module.exports = db;
