angular.module('salesAngular')
	.factory('RegionService', function($http){
		
		var regions = []; 

		return{
			create: function(region){
				return $http.post('/api/regions', region)
				.then(function(result){
					regions.push(result.data); 
				});
			},

			findAll: function(){
				return $http.get('/api/regions')
				.then(function(result){
					angular.copy(result.data, regions)
					return regions;
				});
			}, 

			destroy: function(region){
				return $http.delete('/api/regions/' + region.id)
				.then(function(){
					var idx = regions.indexOf(region); 
					regions.splice(idx, 1); 
				});
			}




		};
	});
