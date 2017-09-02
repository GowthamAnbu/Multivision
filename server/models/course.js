var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var courseSchema = new Schema({
	title: {type:String/*,required:'{PATH} is required'*/},
	featured:{type:Boolean/*,required:'{PATH} is required'*/},
	published:{type:Date/*,required:'{PATH} is required'*/},
	tags:[String]
});

var course = mongoose.model('course', courseSchema);

function createDefaultCourses() {
	course.find({}).exec(function(err, collection){
		if(collection.length === 0){
		  course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['C#']});
	      course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2013'), tags: ['C#']});
	      course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013'), tags: ['C#']});
	      course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2013'), tags: ['VB']});
	      course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2013'), tags: ['C++']});
	      course.create({title: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2013'), tags: ['JS']});
	      course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2013'), tags: ['Coding']});
	      course.create({title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2/1/2013'), tags: ['Coding']});
	      course.create({title: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2013'), tags: ['Misc']});
	      course.create({title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2013'), tags: ['Management']});
	      course.create({title: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('11/1/2013'), tags: ['Misc']});
	      course.create({title: "Writing Code that Doesn't Suck", featured: true, published: new Date('10/13/2013'), tags: ['Coding']});
	      course.create({title: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2013'), tags: ['Coding']});
	      course.create({title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2013'), tags: ['Misc']});
	      course.create({title: 'Death March Coding for Fun and Profit', featured: true, published: new Date('7/1/2013'), tags: ['Coding', 'Misc']});
		}
	})
}

exports.createDefaultCourses = createDefaultCourses;