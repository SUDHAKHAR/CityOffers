// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives','ngResource'])


.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.factory('Post', function($resource) {
  return $resource('http://104.155.192.54:8080/api/logins');
})


.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['*'];
    }
	])
.factory('merchantRegisterFactory', function($http) {
  var urlBase = 'http://104.155.192.54:8080/api/merchantlogins';
  var _loginService = {};
 
  _loginService.getLogins = function() {
    return $http.get(urlBase);
  };
 
  _loginService.saveLogin = function(login) {
	  console.log("This is factory is merchantlogins app.js save");
    return $http.post(urlBase,login);
  };
 
  _loginService.updateLogin = function(login) {
    return $http.put(urlBase, login);
  };
 
  _loginService.deleteLogin = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _loginService;
})

.factory('addOffer', function($http) {
  var urlBase = 'http://104.155.192.54:8080/api/addoffers';
  var _addofferService = {};
 
  _loginService.getLogins = function() {
    return $http.get(urlBase);
  };
 
  _loginService.saveLogin = function(login) {
	  console.log("This is factory is addoffers app.js save");
    return $http.post(urlBase,login);
  };
 
  _loginService.updateLogin = function(login) {
    return $http.put(urlBase, login);
  };
 
  _loginService.deleteLogin = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _loginService;
})




.factory('loginsFactory', function($http) {
  var urlBase = 'http://104.155.192.54:8080/api/logins';
  var _loginService = {};
 
  _loginService.getLogins = function() {
    return $http.get(urlBase);
  };
 
  _loginService.saveLogin = function(login) {
	  
	  
	  
	  console.log("This is factory Login is app.js save");
    return $http.post(urlBase,login);
  };
 
  _loginService.updateLogin = function(login) {
    return $http.put(urlBase, login);
  };
 
  _loginService.deleteLogin = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _loginService;
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.addoffer', {
    url: "/addoffer",
    views: {
      'menuContent': {
	        templateUrl: "templates/addoffer.html",
			 controller: 'MapCtrl'
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    } 
  });
  
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

