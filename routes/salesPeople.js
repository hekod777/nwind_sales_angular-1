var router = require('express').Router();
var SalesPerson = require('../db').models.SalesPerson;

module.exports = router;

router.get('/', function(req,res,next){
	SalesPerson.findAll()
	.then(function(salesPeople){
		res.send(salesPeople);
	})
	.catch(next);

})

router.post('/', function(req,res,next){
	console.log(req.body);
	SalesPerson.create({
		name: req.body.name
	})
	.then(function(result){
		console.log('created sales person');
		res.send(result)
	})
	.catch(next);
})

router.delete('/:id', function(req,res,next){
	SalesPerson.destroy({
		where: {id: req.params.id}
	})
	.then(function(result){
		console.log('destroyed sales person'); 
		res.sendStatus(200);
	})
	.catch(next); 
})

