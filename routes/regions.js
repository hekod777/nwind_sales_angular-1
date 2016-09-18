var router = require('express').Router();
var Region = require('../db').models.Region;

module.exports = router;

router.get('/', function(req,res,next){
	Region.findAll()
	.then(function(regions){
		res.send(regions);
	})
	.catch(next);

})

router.post('/', function(req,res,next){
	console.log(req.body);
	Region.create({
		zip: req.body.zip
	})
	.then(function(result){
		console.log('created region');
		res.send(result)
	})
	.catch(next);
})

router.delete('/:id', function(req,res,next){
	Region.destroy({
		where: {id: req.params.id}
	})
	.then(function(result){
		console.log('destroyed region'); 
		res.sendStatus(200);
	})
	.catch(next); 
})

