var controllers = angular.module('demoControllers',[]);

function humanize(nr)
{
    steps = [
        ['T', Math.pow(10, 12)],
        ['G', Math.pow(10, 9)],
        ['M', Math.pow(10, 6)],
        ['K', Math.pow(10, 3)]
    ];

    for(var step in steps)
        if (nr > steps[step][1])
            return (nr / steps[step][1]).toFixed(0) + ' ' + steps[step][0];

    return nr.toFixed(0);
}

function uptime(count, interval) {
    return ((count * interval) / (60*60*24))
}

controllers.controller('UsersController', ['$scope', '$http',
    function($scope, $http) {

        $scope.hello = 'world';
        $scope.users = [];

        $http.get('/users')
            .then(function(users){
                $scope.users = users.data.map(function(user){
                    user.pings = user.pings && humanize(user.pings);
                    user.credits = user.credits && user.credits.toFixed(3);
                    return user;
                });
                
                $scope.users.forEach(function(user){
                    $http
                        .get('/user/' + user.email + '/check_count')
                        .then(function(count){
                            user.count = count.data;
                        });
                });
            });

        $scope.addUser = function(){
            // push a new user object
            $scope.users.push({
                name: $scope.newUser.name,
                email: $scope.newUser.email
            });
        };
    }
]);

var DAY = 60 * 60 * 24;
var PING_COST = 100000 * .995;

controllers.controller('ChecksController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {

        $scope.user = {
            email: $routeParams.email_address
        };

        $scope.checks = [];

        $http.get('/user/' + $scope.user.email + '/checks')
            .then(function(checks){
                $scope.checks = checks.data.map(function(check){
                    check.uptime = uptime(check.nr_recent_ups, check.interval);
                    check.downtime = uptime(check.nr_recent_downs, check.interval);
                    check.daily_frequency = DAY / check.interval;
                    var c = (check.daily_frequency * 30.5 * check.locations.length);
                    check.monthly_cost = (c / PING_COST).toFixed(2);
                    return check;
                });
            });
    }
]);


controllers.controller('PaymentController', ['$scope', function($scope) {
    $scope.amount = 10;
}]);