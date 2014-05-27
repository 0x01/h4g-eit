var controllers = angular.module('demoControllers',[]);

controllers.controller('MainController', ['$scope', '$http',
    function($scope, $http) {

        $scope.hello = 'world';
        $scope.users = [];

        $http.get('/users')
            .then(function(users){
                $scope.users = users.data.map(function(elt){
                    elt.credits = elt.credits && elt.credits.toFixed(3);
                    return elt;
                });
            });

        $scope.addUser = function(){
            // push a new user object
            $scope.users.push({
                name: $scope.newUser.name,
                email: $scope.newUser.email
            });
        };
    }]);

controllers.controller('PaymentController', ['$scope', function($scope) {
    $scope.amount = 10;
}]);