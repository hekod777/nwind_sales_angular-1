angular.module('salesAngular')
	.factory('SalesPersonService', function($http){
		
		var salesPeople = []; 

		return{
			create: function(salesPerson){
				return $http.post('/api/salesPeople', salesPerson)
				.then(function(result){
					salesPeople.push(result.data); 
				});
			},

			findAll: function(){
				return $http.get('/api/salesPeople')
				.then(function(result){
					angular.copy(result.data, salesPeople);
					return salesPeople;
				})
			}, 

			destroy: function(salesPerson){
				console.log(salesPerson);
				return $http.delete('/api/salesPeople/' + salesPerson.id)
				.then(function(){
					console.log(salesPeople); 
					// console.log('delete route done')
					var idx = salesPeople.indexOf(salesPerson); 
					salesPeople.splice(idx, 1); 

				})
			}




		};
	});
