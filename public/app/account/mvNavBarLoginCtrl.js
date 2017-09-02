//rootfile navbar-login.jade
angular.module('app').controller('mvNavBarLoginCtrl',function($scope, $http, mvNotifier, mvIdentity, mvAuth, $location){
	$scope.identity = mvIdentity;
	$scope.signin = function(username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if (success){
				mvNotifier.notify('you have successfully signed in !');
			} else{
				mvNotifier.notify('username or password is incorrect');
			}
		});
	}
	$scope.signout = function(){
		mvAuth.logoutUser().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify("you have successfully signed out !");
			$location.path("/");
		});
	}
});