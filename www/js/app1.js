loginApp=angular.module('loginApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/login.html',
        controller: 'LoginCtrl'	
      }).otherwise({
        redirectTo: '/'
      });
  });
