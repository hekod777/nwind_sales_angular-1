angular.module('salesAngular')
	.controller('regionsCtrl', function($scope,RegionService){
		$scope.create = function(){
			RegionService.create({zip: $scope.zipcode})
			.then(function(region){
				// console.log(region);
				$scope.regions.push(region);
			})
			.catch(function(err){
				console.log(err);
			});
		};


		RegionService.findAll()
		.then(function(regions){
			// console.log(regions);
			$scope.regions = regions;
		})
		.catch(function(err){
			console.log(err);
		});


	})