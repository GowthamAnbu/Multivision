angular.module('app').factory('mvCachedCourses', function(mvcourse) {
  var courseList;
  return {
    query: function() {
      if(!courseList) {
        courseList = mvcourse.query();
      }

      return courseList;
    }
  }
})