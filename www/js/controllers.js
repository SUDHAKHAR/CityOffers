angular.module('starter.controllers',[])


.controller('MapCtrl', function($scope, $ionicModal, $ionicLoading,merchantRegisterFactory, $http) {
	
	
	// THIS IS IN ADD OFFER FOR NEW REGISRTER
	$ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

	 $scope.register = function() {
  $scope.modal.show();
  };
	
	 $scope.closeregister = function() {
    $scope.modal.hide();
  };
	
	$scope.addoffer_new=function($event){
	alert("This is in Map Control registermerchant");
	
	
	};
	
	/*
	
	 navigator.geolocation.getCurrentPosition(function (pos) {
		
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

      console.log('Got pos', pos);
	// alert('This is in geolocation');
	  console.log("This is in Map Control", pos);
	  
	//   alert('This is in geolocation 1');
  
 //  alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 // alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(16);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		//  alert('This is in geolocation 5  :'+results[1].formatted_address);
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(16);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace( ({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
      //infowindow.setContent(results[1].formatted_address);
		infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
		   window.localStorage['area.register.local'] = ''+t1;
		  window.localStorage['city.register.local'] = ''+t5;
		  $scope.arearegister=t1;
		$scope.cityregister=t5;
		  $scope.loginData.area = ''+t1;
		  $scope.loginData.city = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  
 
  
  
  

		// alert('This is in geolocation 4');
		// $ionicLoading.hide();
		$ionicLoading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;

	$ionicLoading.hide();
	  }, function (error) {
     
    })

	*/
	$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	$scope.registermerchant=function($event){
		
		 console.log("This is in Map Control registermerchant");
	
	 var now = new Date();
  
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		
		
		return $http({
            method: "POST",
            headers: headers,
      url: 'http://104.155.192.54:8080/api/merchantlogins',
            data: {
        "loginid": $scope.loginData.userid,
        "isActive": true,
		"password":$scope.loginData.pass,
		"companyname":$scope.loginData.compname,
		"area":$scope.loginData.area,
		"city":$scope.loginData.city,
		"email":$scope.loginData.email,
		"contact1":$scope.loginData.contact1,
		"contact2":$scope.loginData.contact2
      }
    }).success(function(data) {
                console.log("Recoded sucessfully in merchant login success!")
				  alert(data);
        $scope.logins.push(data.data);
		  $scope.loginusername=$scope.loginData.username;
		   $scope.isLogin=true;
	 $scope.modal.hide();

                console.log(data);
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!")
				alert(status);
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
	
	
	
	
	
	
	
	
		 merchantRegisterFactory.saveLogin({
        "loginid": $scope.loginData.userid,
        "isActive": true,
		"password":$scope.loginData.pass,
		"companyname":$scope.loginData.compname,
		"area":$scope.loginData.area,
		"city":$scope.loginData.city,
		"email":$scope.loginData.email,
		"contact1":$scope.loginData.contact1,
		"contact2":$scope.loginData.contact2
      }).then(function(data) {
		  
        $scope.logins.push(data.data);
		  $scope.loginusername=$scope.loginData.username;
		   $scope.isLogin=true;
		 $scope.modal.hide();
      });
		
		alert('Registered Sucessfully');
		
		
		
	
		
		};
	
	
	
	 $scope.logout = function() {
	 
    $scope.isLogin=false;
  };
  
  
    })
 
 
 
.controller('AppCtrl', function($scope, $ionicModal, $timeout,loginsFactory, $ionicLoading, $http,Post) {
	


  // Form data for the login modal
  $scope.loginData = {};
$scope.logins = [];
  $scope.isEditable = [];
  $scope.passwords = [];
  $scope.isLogin=false;
  // Create the login modal that we will use later
 $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
 $scope.logout = function() {
	 
    $scope.isLogin=false;
  };
  
  
  
  
  
  
  
  
  // Perform the login action when the user submits the login form
  $scope.save = function($event) {
	  
	/*   var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
			};
    $cordovaSms.send('+919618188535', 'This is a Sample sms', options)
      .then(function() {
		  alert("This is sending smms");
        // Success! SMS was sent
      }, function(error) {
        // An error occurred
      });
	  */
	   
	 console.log('Doing login', $scope.loginData);
	// alert($scope.loginData.password);
	
	 var userid11=$scope.loginData.username;
	 var pass11=$scope.loginData.password;
	 alert(' UserId:'+$scope.loginData.username+' Password:'+$scope.loginData.password);
	 if($scope.loginData.username==''||$scope.loginData.password=='')
	 {
		  alert(' UserId/Password cannot be empty');
		 
	 }
	 else{

//	var lat=window.localStorage['pos.coords.latitude.local'] ;
//	var lon=window.localStorage['pos.coords.longitude.local'] ;
	var area='pdt';
	var city='vskp' ;
	console.log("This is save in appctrl");
	 var now = new Date();

$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
  
        var headers1 = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		var t1=$scope.loginData.username;
		var t2=$scope.loginData.password;
		console.log("This is save in appctrl 2: User:"+t1+' Pass'+t2);
		return $http({
            method: "POST",
            headers: headers1,
      url: 'http://104.155.192.54:8080/api/logins',
            data: {
      "login": t1,
        "isAdmin": false,
		"password":t2,
		
		"date":''+now
      }
    }).success(function(data) {
                console.log("Auth.signin.success!")
				alert("Auth.signin.success!");
				  $scope.logins.push(data.data);
		  $scope.loginusername=$scope.loginData.username;
		   $scope.isLogin=true;
		 $scope.modal.hide();
	
	console.log(data);
	
              
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!"+data)
        console.log(data);
        console.log(status);
		 alert(data);
        console.log(headers);
        console.log(config);
    });
	
	
	
	
	
 console.log("This is save in appctrl 3");
    /* loginsFactory.saveLogin({
        "login": $scope.loginData.username,
        "isAdmin": false,
		"password":$scope.loginData.password,
		
		"date":''+now

      }).then(function(data) {
		  $scope.isLogin=true;
        $scope.logins.push(data.data);
		 console.log("This is in data save login:"+data)
      });*/
   
//	$scope.arearegister=area;
//	$scope.cityregister=city;
	

      }
  };
  

  
  /*This for Map ctrl in login .html page */



	
	/*
	 console.log("This is in Map Control");
  $scope.mapCreated = function(map) {
    $scope.map = map;
	
	
  };
  
  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialise() {   
  //  var myLatlng = new google.maps.LatLng(17.8333,83.2000);
	 var latlng = new google.maps.LatLng(17.8333,83.2000);

//	geocoder = new google.maps.Geocoder();

	 var mapOptions = {
           zoom: 16,
    center: latlng,
    mapTypeId: 'roadmap'

        };
}
  
  $scope.centerOnMe = function () {
	  alert('This is in ccenterOnMe() function');
    console.log("Centering");
	
    if (!$scope.map) {
		alert('This is in MapCTRL  Error Occured');
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
	  
	  
      showBackdrop: true
    });

	 
	
    navigator.geolocation.getCurrentPosition(function (pos) {
		
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

      console.log('Got pos', pos);
	// alert('This is in geolocation');
	  console.log("This is in Map Control", pos); 
	//   alert('This is in geolocation 1');
 //  alert('This is in geolocation 2'+pos);
  var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
 // alert('This is in geolocation 3');
   var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        $scope.map.setZoom(16);
        marker = new google.maps.Marker({
            position: latlng,
            map: $scope.map
			//location: results[1].geometry.location
        });
		 google.maps.event.addListener(marker, 'click', function() {
    infowindow.open($scope.map, marker);
  });
		//  alert('This is in geolocation 5  :'+results[1].formatted_address);
	//	var t=$scope.map.PlaceResult.name;
		
		
		if (!results[1].geometry) {
      return;
    }

    if (results[1].geometry.viewport) {
      $scope.map.fitBounds(results[1].geometry.viewport);
    } else {
      $scope.map.setCenter(results[1].geometry.location);
      $scope.map.setZoom(16);
    }

    // Set the position of the marker using the place ID and location
    marker.setPlace(({
		//name:results[1].name,
      placeId: results[1].place_id,
      location: results[1].geometry.location
    }));
    marker.setVisible(true);
var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
      //infowindow.setContent(results[1].formatted_address);
		infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
        infowindow.open($scope.map, marker);
		 window.localStorage['place.area.local'] = ''+t1;
		  window.localStorage['place.city.local'] = ''+t5;
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
  
  
  
  
  
  

		 alert('This is in geolocation 4');
		// $ionicLoading.hide();
		$ionicLoading.hide();
	window.localStorage['pos.coords.latitude.local'] = pos.coords.latitude;
	window.localStorage['pos.coords.longitude.local'] = pos.coords.longitude;
	$ionicLoading.hide();
	  }, function (error) {
     
    });
  };  
  
  
  */
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

