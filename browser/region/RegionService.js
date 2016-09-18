angular.module('salesAngular')
	.factory('RegionService', function($http){
		
		var regions = []; 

		return{
			create: function(zip){
				console.log(zip);
				return $http.post('/api/regions', zip)
				.then(function(result){
					regions.push(result.data); 
					// return result.data;
				});
			},

			findAll: function(){
				return $http.get('/api/regions')
				.then(function(result){
					angular.copy(result.data, regions)
					return regions;
				})
			}, 

			destroy: function(region){
				console.log(region);
				return $http.delete('/api/regions/' + region.id)
				.then(function(){
					console.log(regions); 
					// console.log('delete route done')
					var idx = regions.indexOf(region); 
					regions.splice(idx, 1); 

				})
			}




		};
	});