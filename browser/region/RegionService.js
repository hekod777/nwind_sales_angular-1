angular.module('salesAngular')
	.factory('RegionService', function($http){
		
		var regions = []; 

		return{
			create: function(zip){
				return $http.post('/api/regions', zip)
				.then(function(result){
					return result.data;
				});
			},

			findAll: function(){
				return $http.get('/api/regions')
				.then(function(result){
					angular.copy(result.data, regions)
					return regions;
				})
			}




		};
	});