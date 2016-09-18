angular.module('salesAngular')
	.controller('CompanyStatusCtrl', function($scope, RegionService, SalesPersonService){
		RegionService.findAll()
		.then(function(regions){
			console.log($scope);
			$scope.regions = regions; 
		})
		.catch(function(err){
			console.log(err)
		}); 

		SalesPersonService.findAll()
		.then(function(salesPeople){
			// console.log(salesPeople);
			$scope.salesPeople = salesPeople; 
			// console.log($scope.salesPeople);
		})
		.catch(function(err){
			console.log(err)
		})
	})