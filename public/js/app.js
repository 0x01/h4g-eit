
var demoApp = angular.module('demoApp',['ngRoute', 'demoControllers']);

demoApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'partials/users.html'
        })
        .otherwise({
            redirectTo:'/'
        });
});
