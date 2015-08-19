angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
	  
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
       
        };
		
	
		var area;
		var city;
		var address;

  	
		 
		
   navigator.geolocation.getCurrentPosition(function(pos) {
	   
           
			 var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
		  var kk=results[1].formatted_address;
		 var str1= kk.split(', ',10);
        console.log("Recoded sucessfully in add offer success!: "+results[1].formatted_address+" Address Area:"+str1[str1.length-4]+" Address City:"+str1[str1.length-3]);
	   var input1 = results[1].formatted_address;
var t3= results[1].address_components;
var t5=t3[1].short_name;
  var latlngStr = input1.split(',', 4);
  var t1 =latlngStr[0];
  
	   var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "Location"
            });
	   
	  infowindow.setContent('<div><strong> Area: ' + t1 + '<br> City: '+t5+'</strong><br>' +'Place ID: ' + results[1].place_id + '<br>' +results[1].formatted_address+'');
       infowindow.open(map, myLocation);
	    window.localStorage['place.area.local'] =str1[str1.length-4];
		  window.localStorage['place.city.local'] = str1[str1.length-3];
		   window.localStorage['area.register.local'] = ''+t1;
		  window.localStorage['city.register.local'] = ''+t5;
		  $scope.arearegister=t1;
		$scope.cityregister=t5;
		
  }}});
            
				 
        });
		
        // Stop the side bar from dragging when mousedown/tapdown on the map
     
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
       
      }
    }
  }
});
