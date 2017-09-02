angular.module('app').controller('mvcourseDetailsCtrl', function($scope, mvCachedCourses, $routeParams){
	//$scope.course = mvcourse.get({_id:$routeParams.id})
	mvCachedCourses.query().$promise.then(function(collection){
		collection.forEach(function(course){
			if(course._id === $routeParams.id){
				$scope.course = course;
			}
		})
	})
})