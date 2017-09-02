/*
rootfile app.js
since mvUser is a resource we can use query to get all the users 
refer /app/account/mvUser.js --> source code to get the collection
*/
angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){
	$scope.users = mvUser.query();
});