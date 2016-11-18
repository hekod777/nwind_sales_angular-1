var router = require('express').Router();
var Room = require('../db').models.Room;
var Channel = require('../db').models.Channel;
var Sequelize = require('sequelize');

module.exports = router;

router.get('/', function(req,res,next){
	Channel.findAll()
		.then(function(rooms){
			res.send(rooms);
		})
		.catch(next);
})

router.put('/increase/:roomname', function(req,res,next){
	Channel.update({
			view:Sequelize.literal('view + 1')
		},
		{
			where:{
				name:req.params.roomname
			}
		}
	)
		.then(function(room){
			res.send(room);
		})
		.catch(next);
})

router.put('/reduce/:roomname', function(req,res,next){
	Channel.update({
			view:Sequelize.literal('view - 1')
		},
		{
			where:{
				name:req.params.roomname
			}
		}
	)
		.then(function(room){
			res.send(room);
		})
		.catch(next);
})


router.post('/:id', function(req,res,next){
	Channel.create({
		name: req.params.id,
		tags: req.body.tags,
		coverimage: req.body.coverImage,
		category: req.body.category,
	})
		.then(function(room){
			res.send(room);
		})
		.catch(next);
})

router.delete('/:id', function(req,res,next){
	Channel.destroy({
		where:{
			name: req.params.id
		}
	})
	.then(function(){
		res.sendStatus(200);
	})
	.catch(next);
})

