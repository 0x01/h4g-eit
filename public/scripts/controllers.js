(function () {

'use strict';

angular.module('myApp.controllers', [])
	.controller('ListController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.foo = "hello";

	      var msnry = new Masonry( "#container", {
	        // options
	        columnWidth: 140,
	        itemSelector: '.item'
	      });

			console.log('fooob');

			$http
				.get('/api/cards')
				.then(function(data) {
					$scope.cards = data.data;
				});
		}
	])
	.controller('IssueController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.issue = Issue;
		}
	])
	.controller('RootController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.location = function() {
				return $location.path();
			};
		}
	])
})();