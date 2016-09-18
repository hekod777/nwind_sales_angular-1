angular.module('salesAngular')
	.controller('CompanyStatusCtrl', function($scope, RegionService){
		RegionService.findAll()
		.then(function(regions){
			console.log($scope);
			$scope.regions = regions; 
		})
		.catch(function(err){
			console.log(err)
		})
	})