var router = require('express').Router();

module.exports = router;

router.use('/', function(req, res, next){
	res.status('200').status('Success');
});