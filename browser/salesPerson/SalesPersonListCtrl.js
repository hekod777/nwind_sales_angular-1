angular.module('salesAngular')
	.controller('SalesPersonCtrl', function($scope,SalesPersonService){
		$scope.create = function(){
			SalesPersonService.create($scope.salesPerson)
			.then(function(salesPerson){
        $scope.salesPerson = null;
			})
			.catch(function(err){
				console.log(err);
			});
		};

		$scope.destroy = function(salesPerson){
			SalesPersonService.destroy(salesPerson)
			.then(function(){
				console.log('salesPerson destroyed')
			})
			.catch(function(err){
				console.log(err)
			})
		}


		SalesPersonService.findAll()
		.then(function(salesPeople){
			// console.log(regions);
			$scope.salesPeople = salesPeople;
		})
		.catch(function(err){
			console.log(err);
		});


	})
