/*rootfile server.js
Basically routes happen only if the user is authenticated
first we can the require auth
*/
var auth = require('./auth'),
	courses = require('../controllers/courses'),
	users = require('../controllers/users'),
	mongooose = require('mongoose'),
	User = mongooose.model('User');

module.exports = function(app){
/*auth.reqiresApiLogin EXPRESS ITSELF calls the function 
with the req,res,next objects
*/
	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users',users.createUser);
	app.put('/api/users',users.updateUser);

	app.get('/api/courses',courses.getCourses);
	app.get('/api/courses/:id',courses.getCourseById);

	app.get('/partials/*',function(request,response){
		response.render('../../public/app/'+request.params[0]);
	});
/*
auth.authenticate is a function that uses passport to call the 
default passport authenticate function(auth.js) which uses strategies
developers written in source code(server.js) 
*/
	app.post('/login',auth.authenticate);

	app.post('/logout',function(request, response){
		request.logout();
		/*
		redirection is not done here because we have redirection in the 
		client side /app/account/mvNavBarLoginCtrl 
		*/
		response.end();
	});
/*
requesting an api that doesn't exist
this is tested by creating only the client side code for courses 
and calling the api that doesn't exist(/api/course)
*/
	app.all('/api/*',function(request, response){
		response.send(404);
	});

	app.get('*',function(request, response){
		response.render('index',{
			bootstrappedUser:request.user
		});
	});
}