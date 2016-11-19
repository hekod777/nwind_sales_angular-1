angular.module('salesAngular')
	.factory('BroadCastFactory', function($http, $rootScope, $window){
		
		var channels = []; 

		var BroadCastFactory = {};

		BroadCastFactory.reduceView = function(roomname){ //reduce view count by 1
			return $http.put('/api/rooms/reduce/'+ roomname)
				.then(function(result){

				})
		}

		BroadCastFactory.increaseView = function(roomname){ //increase view count by 1
			return $http.put('/api/rooms/increase/'+ roomname)
				.then(function(result){

				})
		}

		BroadCastFactory.createRoom = function(roomId, extra){ //add a new channel to database after someone opens a room
			return $http.post('/api/rooms/'+roomId, extra)
				.then(function(result){
					channels.push(result.data); // this code is probably not needed 
					console.log(result.data); // this code is probably not needed
				})
		}

		BroadCastFactory.findAllRooms = function(){ // get all channels from our database
			return $http.get('/api/rooms')
				.then(function(result){
					console.log(result);
					angular.copy(result.data, channels);
					return channels;
				})
		}

		BroadCastFactory.closeRoom = function(roomId){ // remove a room from our database
			return $http.delete('/api/rooms/' + roomId)
				.then(function(result){
					BroadCastFactory.findAllRooms(); //this code is probably not needed
				})
				.then(function(){
					console.log(channels);
				})
		}

	    $window.onbeforeunload = function (e,confimration,scope) { //this block is about doing something right before the page is unloaded by the browser
	        var confirmation = {}; //does not affect our app, it's just for the pop up when you try to refresh the page and stuff
	        var event = $rootScope.$broadcast('onBeforeUnload', confirmation);//same as above, just for the pop up
	        console.log(scope); // this scope is useless, so you can remove both scope variable in this block of code
	        if ($rootScope.broadcasting){ //if the user using this page is a broadcaster, then do the following
	        	BroadCastFactory.closeRoom($rootScope.unwanted); //remove the channel from our database, $rootScope.unwanted is actually the room name for this broadcaster
	        	$rootScope.broadcasting = false; //this tells our app that this guy is no longer broadcasting, it's useful when we have a button to stop broadcasting
	        }

	        if($rootScope.watching){ //if the user using this page is a viewer, then do the following
	        	console.log($rootScope.unwatching);
	        	BroadCastFactory.reduceView($rootScope.unwatching);//reduce the view count of the channel by 1, $rootScope.unwatching is the room name the viewer is in
	        	$rootScope.watching = false; //this tells our app that this guy is no longer watching. this line is probably not need. everything should be still fine without it.
	        }

	        if (event.defaultPrevented) { //this is for the pop up
	        	console.log(e);
	        	console.log("wtf");
	        	console.log($rootScope.unwanted);
	        	console.log(scope);
	            return confirmation.message;
	        }
	    };
	    
	    $window.onunload = function (e, scope) { //this is probably not needed as well, since we have handled everything before unload
	    	console.log(scope);
	    	BroadCastFactory.closeRoom($rootScope.unwanted);
	        $rootScope.$broadcast('onUnload');
	    };

		return BroadCastFactory;


})
.run(function(BroadCastFactory){ //this code ensures the before unload always work

});



