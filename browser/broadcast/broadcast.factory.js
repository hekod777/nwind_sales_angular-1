angular.module('salesAngular')
	.factory('BroadCastFactory', function($http, $rootScope, $window){
		
		var channels = []; 

		var BroadCastFactory = {};

		BroadCastFactory.reduceView = function(roomname){
			return $http.put('/api/rooms/reduce/'+ roomname)
				.then(function(result){

				})
		}

		BroadCastFactory.increaseView = function(roomname){
			return $http.put('/api/rooms/increase/'+ roomname)
				.then(function(result){

				})
		}

		BroadCastFactory.createRoom = function(roomId, extra){
			return $http.post('/api/rooms/'+roomId, extra)
				.then(function(result){
					channels.push(result.data);
					console.log(result.data);
					//run the load channels;
				})
		}

		BroadCastFactory.findAllRooms = function(){
			return $http.get('/api/rooms')
				.then(function(result){
					console.log(result);
					angular.copy(result.data, channels);
					return channels;
				})
		}

		BroadCastFactory.closeRoom = function(roomId){
			return $http.delete('/api/rooms/' + roomId)
				.then(function(result){
					BroadCastFactory.findAllRooms();
				})
				.then(function(){
					console.log(channels);
				})
		}

	    $window.onbeforeunload = function (e,confimration,scope) {
	        var confirmation = {};
	        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
	        console.log(scope);
	        if ($rootScope.broadcasting){
	        	BroadCastFactory.closeRoom($rootScope.unwanted);
	        	$rootScope.broadcasting = false;
	        }

	        if($rootScope.watching){
	        	console.log($rootScope.unwatching);
	        	BroadCastFactory.reduceView($rootScope.unwatching);
	        	$rootScope.watching = false;
	        }

	        if (event.defaultPrevented) {
	        	console.log(e);
	        	console.log("wtf");
	        	console.log($rootScope.unwanted);
	        	console.log(scope);
	            return confirmation.message;
	        }
	    };
	    
	    $window.onunload = function (e, scope) {
	    	console.log(scope);
	    	BroadCastFactory.closeRoom($rootScope.unwanted);
	        $rootScope.$broadcast('onUnload');
	    };

		return BroadCastFactory;


})
.run(function(BroadCastFactory){

});

		// return{
		// 	create: function(zip){
		// 		console.log(zip);
		// 		return $http.post('/api/regions', zip)
		// 		.then(function(result){
		// 			regions.push(result.data); 
		// 			// return result.data;
		// 		});
		// 	},

		// 	findAll: function(){
		// 		return $http.get('/api/regions')
		// 		.then(function(result){
		// 			angular.copy(result.data, regions)
		// 			return regions;
		// 		})
		// 	}, 

		// 	destroy: function(region){
		// 		console.log(region);
		// 		return $http.delete('/api/regions/' + region.id)
		// 		.then(function(){
		// 			console.log(regions); 
		// 			// console.log('delete route done')
		// 			var idx = regions.indexOf(region); 
		// 			regions.splice(idx, 1); 

		// 		})
		// 	}




