angular.module('salesAngular')
	.controller('regionsCtrl', function($scope,RegionService){
		$scope.create = function(){
			RegionService.create({zip: $scope.zipcode})
			.then(function(region){
				$scope.zipcode = '';
			})
			.catch(function(err){
				console.log(err);
			});
		};

		$scope.destroy = function(region){
			RegionService.destroy(region)
			.then(function(){
				console.log('region destroyed')
			})
			.catch(function(err){
				console.log(err)
			})
		}


		RegionService.findAll()
		.then(function(regions){
			// console.log(regions);
			$scope.regions = regions;
		})
		.catch(function(err){
			console.log(err);
		});


	})