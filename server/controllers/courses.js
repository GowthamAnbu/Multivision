var course = require('mongoose').model('course');

exports.getCourses = function(request, response){
	course.find({}).exec(function(err, collection){
		response.send(collection);
	})
};

exports.getCourseById = function(request, response){
	course.findOne({_id:request.params.id}).exec(function(err, collection){
		response.send(collection);
	})
}