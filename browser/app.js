angular.module('salesAngular', ['ui.router']); 

angular.module('salesAngular')
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: '/', 
				templateUrl: '/home.html',
				controller: 'homeCtrl'
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