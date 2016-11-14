var router = require('express').Router();

module.exports = router;

router.use('/rooms', require('./rooms.js'));

router.use('/', function(req, res, next){
		res.send('Success /api');
});