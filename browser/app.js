angular.module('salesAngular', ['ui.router']); 

angular.module('salesAngular')
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/', 
				templateUrl: '/home.html',
				controller: 'homeCtrl'
			})
			.state('broadcast', {
				url: '/broadcast',
				templateUrl: '/broadcast/broadcast.html',
				resolve:{
					channels: function(BroadCastFactory){
						//console.log("finding");
						return BroadCastFactory.findAllRooms();
					}
				},
				controller: 'broadcastCtrl'
			})
			.state('regions', {
				url: '/regions', 
				templateUrl: '/region/regions.html'
			})
			.state('salesPeople', {
				url: '/salesPeople', 
				templateUrl: '/salesPerson/salesPeople.html'
			})

			$urlRouterProvider.otherwise('/'); 
	}); 	