(function () {

'use strict';

angular.module('myApp.controllers', [])
	.controller('LandingController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
		}
	])
	.controller('OverViewController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.foo = "hello";

	      var msnry = new Masonry( "#container", {
	        // options
	        columnWidth: 140,
	        itemSelector: '.item'
	      });

			$scope.viewDetail = function (id) {
				$location.url('/detail/' + id);
			}

			$http
				.get('/api/cards')
				.then(function(data) {
					if(data.status === 200 && data.data)
						$scope.cards = data.data.map(function(item){
							console.log(item);
							return {
								title: item.name,
								author: 'Jean-Pierre',
								description: item.description,
								id: item.id,
								stars: 30,
								upvotes: 14,
								tags: ['climate', 'ebola', 'help']
							}
						});
				});
		}
	])
	.controller('DetailController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
		}
	])
})();