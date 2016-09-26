angular.module('salesAngular')
	.controller('regionsCtrl', function($scope, RegionService){
		$scope.create = function(){
			RegionService.create($scope.region)
			.then(function(region){
        $scope.region = null;
			})
			.catch(function(err){
				console.log(err);
			});
		};

		$scope.destroy = function(region){
			RegionService.destroy(region)
			.then(function(){
				console.log('region destroyed');
			})
			.catch(function(err){
				console.log(err);
			});
		};


		RegionService.findAll()
		.then(function(regions){
			$scope.regions = regions;
		})
		.catch(function(err){
			console.log(err);
		});
	});
