(function () {

'use strict';


var lorem = "Issue description or pitch. Phasellus quis ligula ut enim pretium ornare nec nec est. Vestibulum eget ipsum fringilla, scelerisque velit vel, cursus eros. Curabitur ullamcorper interdum sapien quis pretium. In eget tristique massa. In lacinia risus sed ullamcorper bibendum. Sed consectetur nec sem at venenatis. Integer sed lacinia risus, eu malesuada lectus. In dignissim congue massa, eu eleifend dui tristique maximus. Sed vehicula ante ut mauris vehicula, non laoreet arcu dapibus.";

angular.module('myApp.controllers', [])
	.controller('LandingController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
		}
	])
	.controller('OverViewController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.foo = "hello";

		var container = document.querySelector('#container');
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
							console.log('HERE', item);
							return {
								title: item.name,
								author: 'Jean-Pierre',
								description: item.description,
								key: item.key,
								stars: 30,
								upvotes: 14,
								tags: ['climate', 'ebola', 'help'],
								image_url: item.image_url
							}
						});
				});
		}
	])
	.controller('DetailController', ['$scope', '$http', '$location', '$routeParams',
		function($scope, $http, $location, $routeParams) {

			var id = $routeParams.id;

			$scope.card = {}

			$http
				.get('/api/cards/one?id=' + id)
				.then(function(data){
					if(data && data.data.length)
					{
						var card = data.data[0];
						$scope.card = {
							stars: Math.floor(Math.random()*100),
							upvotes: Math.floor(Math.random()*100),
							title: card.name,
							author: 'Jean-Pierre',
							description: card.description,
							tags: ['ebola', 'seirra-leone'],
							level: card.level,
							id: card.key
						}
					};
				});

			$scope.children = [
				{
					id: 123,
					title: "Send contained beds for hospitals",
					author: 'Jean-Pierre'
				}
			]

			$scope.drillDown = function(id) {
				$location.url('/detail/' + id);
			}

			$scope.doBreakdown = function () {
				$scope.openModal({}, $scope.card.id)
			}

			$scope.doStar = function () {
				$scope.card.stars += 1;
			}
		}
	])
	.controller('RootController', ['$scope', '$http', '$location', '$modal',
		function($scope, $http, $location, $modal) {
			$scope.location = function() {
				return $location.path();
			};

			$scope.openModal = function(key, parent) {
				$location.url('/modal');
			}
		}
	])
})();