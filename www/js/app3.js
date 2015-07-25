




	
/*
// Include dependency: ngCordova
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {



        // Important!!
        // 
        // Instantiate database file/connection after ionic platform is ready.
        // 
      //  db = $cordovaSQLite.openDB("lokaloffers.db");
      //  $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,password TEXT)');


    });
})
	
	$scope.save = function(loginusername,loginpassword) {

    $cordovaSQLite.execute(db, 'INSERT INTO login (username,password) VALUES (?,?)', [loginusername,loginpassword])
        .then(function(result) {
            $scope.statusMessage = "Login successful, cheers!";
        }, function(error) {
            $scope.statusMessage = "Error on saving: " + error.message;
        })

}
$scope.load = function() {

        // Execute SELECT statement to load message from database.
        $cordovaSQLite.execute(db, 'SELECT * FROM login ORDER BY id ')
            .then(
                function(result) {

                    if (result.rows.length > 0) {

                        $scope.newMessage = result.rows.item(0).message;
                        $scope.statusMessage = "Message loaded successful, cheers!";
                    }
                },
                function(error) {
                    $scope.statusMessage = "Error on loading: " + error.message;
                }
            );
    }



*/
    

