angular.module('app').factory('mvcourse',function($resource){
	var courseResource = $resource('/api/courses/:_id',{_id: "@id"},{
		update : {method:'PUT', isArray:false}
	});
	return courseResource;
});