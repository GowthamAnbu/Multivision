/*rootfile mvNavBarLoginCtrl.js --> this is also the root file
mvuser is a resource created to make our application easy by adding the function
to the corresponding instance of any object. this is similar to the way we created
the userSchema methods --> helps as add methods to the current object's instance
(called method in another module)  
*/
angular.module('app').factory('mvAuth',function($http, mvIdentity, $q, mvUser){
	return{
		authenticateUser:function(username, password){
			var dfd = $q.defer();
			$http.post('/login',{username:username, password:password}).then(function(response){
				if(response.data.success){
					var user = new mvUser();
					/*extend is used to add the response user to the mvUser user
					  since we didn't add anything to the mvUser in its definition(mvUser.js)	
					*/
					angular.extend(user, response.data.user);
					mvIdentity.currentUser = user;
					dfd.resolve(true);
				} else{
					dfd.resolve(false);
				}
			});
			return dfd.promise;
		},
		createUser:function(newUserData){
			var newUser = new mvUser(newUserData);
			var dfd = $q.defer();
/*
save function tries to hit the post for /api/users refer mvUser.js
*/
			newUser.$save().then(function(){
				mvIdentity.currentUser = newUser;
				dfd.resolve();
			},function(response){
				dfd.reject(response.data.reason);
			})
			return dfd.promise;
		},
		updateCurrentUser:function(newUserData){
			var dfd = $q.defer();
			var clone = angular.copy(mvIdentity.currentUser);
			angular.extend(clone,newUserData);
			clone.$update().then(function(){
				mvIdentity.currentUser = clone;
				dfd.resolve();
			},function(reason){
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		},
		logoutUser:function(){
			var dfd = $q.defer();
			$http.post('/logout',{logout:true}).then(function(){
				mvIdentity.currentUser = undefined;
				dfd.resolve();
			});
			return dfd.promise;
		},
		authorizeCurrentUserForRoute: function(role){
			if(mvIdentity.isAuthorized(role)){
					return true;
			} else{
					return $q.reject('not authorized');
			}
		},
		authorizeAuthenticatedUserForRoute: function(){
			if(mvIdentity.isAuthenticated()){
					return true;
			} else{
					return $q.reject('not authorized');
			}
		}
	}
});