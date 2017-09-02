angular.module('app',['ngResource','ngRoute']);
angular.module('app').config(function($routeProvider, $locationProvider){
	/*
	this can also be included in the resolve in (.when(/admin/users)) but for 
	reusuability we created this object which is very useful for other roles 
	auhtentication too
	*/
	var routeRoleChecks = {
		admin:{
			auth: function(mvAuth){//this is similer to the controller injection like $scope
			return mvAuth.authorizeCurrentUserForRoute('admin');
			}
		},
		user:{
			auth: function(mvAuth){//this is similer to the controller injection like $scope
			return mvAuth.authorizeAuthenticatedUserForRoute();
			}
		}
	}

	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: '/partials/main/main',
		controller: 'mvMainCtrl'
	})
	.when('/admin/users',{
		templateUrl: '/partials/admin/user-list',
		controller: 'mvUserListCtrl',
		resolve:routeRoleChecks.admin
	})
	.when('/signup',{
		templateUrl: '/partials/account/signup',
		controller: 'mvsignupCtrl'
	})
	.when('/profile',{
		templateUrl: '/partials/account/profile',
		controller: 'mvprofileCtrl',
		resolve:routeRoleChecks.user
	})
	.when('/courses',{
		templateUrl: '/partials/Courses/course-list',
		controller: 'mvcourseListCtrl',
	})
	.when('/courses/:id',{
		templateUrl: '/partials/Courses/course-details',
		controller: 'mvcourseDetailsCtrl',
	})
});
/*
the below code runs after all config completed 
it is used to run things for the route change errors

IMPORTANT IF ROUTECHANGE IS INCLUDED then the user can navigate 
to that page but still they won't be able to view page content
cause it's protected
we use route change so that wherever we ned not authorized we 
simply set dfd.reject("message") and it will be maintained by the
run() method here
*/
angular.module('app').run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		if(rejection === 'not authorized'){
			$location.path('/');
		}
	})
})