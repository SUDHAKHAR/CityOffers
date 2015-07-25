loginApp.controller('LoginCtrl', function($rootScope, $scope, loginsFactory) {
 
  $scope.logins = [];
  $scope.isEditable = [];
  $scope.passwords = [];
 
  // get all Todos on Load
  LoginsFactory.getLogins().then(function(data) {
    $scope.logins = data.data;
  });
 
  // Save a Todo to the server
  $scope.save = function($event) {
	  alert('Click Logins');
     loginsFactory.savelogin({
        "login": $scope.loginusername,
        "isCompleted": false,
		"password":$scope.loginpassword
      }).then(function(data) {
        $scope.logins.push(data.data);
      });
      $scope.loginusername = '';
  };
 
  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.logins[i];
    todosFactory.updateLogin({
      _id: _id,
      isCompleted: cbk,
      login: _t.login
    }).then(function(data) {
      if (data.data.updatedExisting) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };
 
  // Update the edited Todo
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.logins[i];
      loginsFactory.updateLogin({
        _id: _t._id,
        login: $event.target.value.trim(),
        isCompleted: _t.isCompleted
      }).then(function(data) {
        if (data.data.updatedExisting) {
          _t.login = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };
 
  // Delete a Todo
  $scope.delete = function(i) {
    loginsFactory.deleteLogin($scope.Logins[i]._id).then(function(data) {
      if (data.data) {
        $scope.logins.splice(i, 1);
      }
    });
  };
 
}); 