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

		// get
			$http
				.get('/api/cards')
				.then(function(data) {
					$scope.cards = data.data;
				});
		}
	])
	.controller('DetailController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
		}
	])
})();