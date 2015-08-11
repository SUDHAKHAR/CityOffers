angular.module('starter.controllers',[])

.controller("ExampleController", function($scope, $cordovaSocialSharing,$cordovaSms,$ionicPopup,addOffer) {
 
   $scope.addoffers=[];
addOffer.getOffers().then(function(data) {
    $scope.addoffers = data.data;
  });
 


   $scope.shareAnywhere = function() {
		 alert("this is in share in Twitter 1");
        $cordovaSocialSharing.share("Welcome To LokalOffers", "you might like this Ad", "www/imagefile.png", "http://lokaloffers.com");
    alert("this is in share in Twitter 2");
   }
 
    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
			 alert("this is in share in Twitter");
            $cordovaSocialSharing.shareViaTwitter(message, image, link);
        }, function(error) {
            alert("Cannot share on Twitter");
        });
    }
	
	
	
 $scope.sendsms	 = function() {
	 alert("This is in Send sms 1");
	  var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

alert("This is in Send sms 2");
    $cordovaSms
      .send('09618188535', 'This is my First SMS', options)
      .then(function() {
        alert("SmS Sent");
      }, function(error) {
          alert("Sms not Sent");
      });
document.addEventListener("deviceready", onDeviceReady, false);
  
 }

})


.controller('MapCtrl', function($scope, $ionicModal,$ionicPopup,$ionicPlatform,$cordovaSms, $cordovaFileTransfer,$ionicLoading,merchantRegisterFactory, $http, Camera, $fileFactory, $cordovaCamera, $cordovaFile) {
	
	/*This is for uploading image to server*/
	
	 $scope.upload2 = function($event) {
		  console.log("This is in upload2 1");
		 document.addEventListener("deviceready", function () {
                var options = {
                     quality: 75,
        targetWidth: 320,
        targetHeight: 320,
                  //  destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: false,
                  //  encodingType: Camera.EncodingType.PNG,
                  //  targetWidth: 800,
                  //  targetHeight: 1100,
                  //  popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {

                    $scope.image = "data:image/png;base64," + imageData;
                }, function (err) {
                    // error
                });
            }	, false);
    };
 
	
	
	/*This is for sending sms*/
	$scope.sendsms=function($event) {
		 console.log("This is in sms 1");
		var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
		
	 document.addEventListener("deviceready", function () {
 console.log("This is in sms 2");
    $cordovaSms
      .send('+919618188535', 'This is Test', options)
      .then(function() {
		   console.log("This is in sms 3");
		   alert("SMS Sent");
        // Success! SMS was sent
      }, function(error) {
		  alert("SMS Not Sent");
        // An error occurred
      });

  });
	};
	
	
	/*This is for files and folders browse*/
	$ionicModal.fromTemplateUrl('templates/explore.html', {
    scope: $scope
  }).then(function(modal1) {
    $scope.modal1 = modal1;
  });
  
	/*This below code is for file browser*/
	var fs = new $fileFactory();
	 $scope.closebrowse = function() {
    $scope.modal1.hide();
  };
 $scope.browse=function($event) {
	 /*
	  console.log("This is in browse.1");
	   $scope.modal1.show();
        fs.getEntriesAtRoot().then(function(result) {
			 console.log("This is in browse.2");
            $scope.files = result;
        }, function(error) {
            console.error(error);
        });

        $scope.getContents = function(path) {
			 console.log("This is in browse.3");
            fs.getEntries(path).then(function(result) {
                $scope.files = result;
                $scope.files.unshift({name: "[parent]"});
                fs.getParentDirectory(path).then(function(result) {
                    result.name = "[parent]";
                    $scope.files[0] = result;
                });
            });
        }
		*/
		
		 var uploadPopup = $ionicPopup.show({
        title: "Upload Ad picture",
        templateUrl: 'templates/explore1.html',
        buttons: [
            {
                text: '',
                type: 'button button-icon icon ion-ios-camera',
                onTap: function(e) {

                    // e.preventDefault() will stop the popup from closing when tapped.
                 //   e.preventDefault();
                 //   alert('Getting camera');
                     Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
       // $scope.upload();
    },
    function(err) {
        console.log(err);
    }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
    });

                }
            },
            {
                text: 'From gallery',
                type: 'button button-positive',
                onTap: function(e) {
                  //  e.preventDefault();
               //     alert('Getting gallery');
                    Camera.getPicture({
                        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    }).then(function(imageURI) {
                        alert(imageURI);
                        $scope.lastPhoto = imageURI;
                    }, function(err) {
                        alert(err);
                    });
                }
            }
        ]
    });
		
		
    };



	
	
			
	// THIS IS IN ADD OFFER FOR NEW REGISRTER
	$ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
       // $scope.upload();
    },
    function(err) {
        console.log(err);
    }, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
    });
};
  
  
 function dataURItoBlob(dataURI) {
    'use strict'
    var byteString, 
        mimestring 

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimestring});
}
  $scope.upload = function() {
    var url = '';
    var fd = new FormData();

    //previously I had this
    //angular.forEach($scope.files, function(file){
        //fd.append('image',file)
    //});

    fd.append('image', $scope.lastPhoto);

    $http.post(url, fd, {

        transformRequest:angular.identity,
        headers:{'Content-Type':undefined
        }
    })
    .success(function(data, status, headers){
        $scope.imageURL = data.resource_uri; //set it to the response we get
    })
    .error(function(data, status, headers){

    })
}
	 $scope.register = function() {
  $scope.modal.show();
  };
	
	
	 $scope.closeregister = function() {
    $scope.modal.hide();
  };
	
	$scope.addoffer_new=function($event,$addOffer){
		$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	$scope.addOffer = {};

	   $scope.loginData = {};
	 alert("This is in Map Control addoffer : "+$addOffer.shopname);
	/*This is for adding offers to database*/
	 var now = new Date();
  var blob_image=dataURItoBlob( $scope.lastPhoto);
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		
		
		return $http({
            method: "POST",
            headers: headers,
      url: 'http://104.155.192.54:8080/api/addoffers',
            data: {
        "loginid": $addOffer.userid,
        "offerarea": $addOffer.area,
		"offershopname":$addOffer.shopname,
		"offercategory":$addOffer.shopcat,
		"offerimage":dataURItoBlob( $scope.lastPhoto),
		"offerdetails":$addOffer.offerdetails,
		"offerstartdate":$addOffer.offerstartdate,
		"offerstarttime":$addOffer.offerstarttime,
		"offerenddate":$addOffer.offerenddate,
		"offerendtime":$addOffer.offerendtime,
		"offeremail":$addOffer.email,
		"offercontact1":$addOffer.contact1,
		"offercontact2":$addOffer.contact2,
		"offerdate":now
		
      }
    }).success(function(data) {
                console.log("Recoded sucessfully in add offer success!");
				  alert("Offer Added Sucessfully."+data);
        $scope.logins.push(data.data);
		 // $scope.loginusername=profile.nickname;
		
	// $scope.modal.hide();
     console.log(data);
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!");
				alert(status);
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
	
	
	
	
	
	
	
	};
	

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
		"area":window.localStorage['place.area.local'] ,
		"city":window.localStorage['place.city.local'] ,
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
		"area":window.localStorage['place.area.local'] ,
		"city":window.localStorage['place.city.local'] ,
		"email":$scope.loginData.email,
		"contact1":$scope.loginData.contact1,
		"contact2":$scope.loginData.contact2
      }).then(function(data) {
		  
        $scope.logins.push(data.data);
		//  $scope.loginusername=$scope.loginData.username;
		   $scope.isLogin=true;
		  
		   	  window.localStorage['userid.local']= $scope.loginData.username;
	
		 $scope.modal.hide();
      });
		
		alert('Registered Sucessfully');
		
		
		
	
		
		};
	
	
	
	 $scope.logout = function() {
	 
    $scope.isLogin=false;
  };
  
  
    })
 
 
 
.controller('AppCtrl', function($scope, auth,store,$location, $ionicModal, $timeout,loginsFactory, $ionicLoading, $http,Post) {
	
	
  // Form data for the login modal
  $scope.loginData = {};
$scope.logins = [];
  $scope.isEditable = [];
  $scope.passwords = [];
  $scope.isLogin=false;
   window.localStorage['isLogin']=false; 
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
	  
	  
    //$scope.modal.show();
	
	 auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: '*'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
	  console.log('THIS IS SUCESS LOGIN');
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/');
	    $scope.isLogin=true;
		
		/* Saving into DataBase User Details*/
		var now = new Date();

$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
  
        var headers1 = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
		var t1=profile.nickname;
		var t2=profile.email;
		console.log("This is save in appctrl 2: User:"+t1+' CITY:'+window.localStorage['place.city.local']);
		return $http({
            method: "POST",
            headers: headers1,
      url: 'http://104.155.192.54:8080/api/logins',
            data: {
      "login": t1,
	  "email":t2,
        "isAdmin": false,
		"area":window.localStorage['place.area.local'] ,
		"city":window.localStorage['place.city.local'] ,
		"date":''+now
      }
    }).success(function(data) {
                console.log("Auth.signin.success!")
			//	alert("Auth signin success!");
				  $scope.logins.push(data.data);
		  $scope.loginusername=profile.nickname;
		//  window.localStorage['userid.local']= t1;
		   window.localStorage['isLogin']=true; 
		   $scope.isLogin=true;
	
		// $scope.modal.hide();
	
	console.log(data);
		
              
    }).error(function(data, status, headers, config) {
                console.log("Auth.signin.error!"+data)
        console.log(data);
        console.log(status);
		 alert(data);
        console.log(headers);
        console.log(config);
    });
	
		
		
		
    }, function() {
      // Error callback
    });
  }
	
 
 $scope.logout = function() {
	  auth.signout();
  store.remove('profile');
  store.remove('token');
    $scope.isLogin=false;
  };
  
  
  
  
  
  
  
  
  // Perform the login action when the user submits the login form
  $scope.save = function($event) {
	  
	
	   
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
	var area=window.localStorage['place.area.local'] ;
	var city=window.localStorage['place.city.local'] ;
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
		"area":window.localStorage['place.area.local'] ,
		"city":window.localStorage['place.city.local'] ,
		"date":''+now
      }
    }).success(function(data) {
                console.log("Auth.signin.success!")
				alert("Auth.signin.success!");
				  $scope.logins.push(data.data);
		//  $scope.loginusername=$scope.loginData.username;
		  window.localStorage['userid.local']= t1;
		   window.localStorage['isLogin']=true; 
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

