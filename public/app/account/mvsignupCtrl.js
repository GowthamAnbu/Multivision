/*
rootfile routes.js
*/
angular.module('app').controller('mvsignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){
	
	$scope.signup = function(){
		var newUserData = {
			username:$scope.email,
			password:$scope.password,
			firstName:$scope.fname,
			lastName: $scope.lname
		};
/*
then function takes second parameter with a function(parameter)
which gets executed once promise fails
*/
		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('user account created');
			$location.path("/");
		},function(reason){
			mvNotifier.error(reason);
		})
	}
});