/*
rootfiles routes.js 
*/
var User = require('mongoose').model('User')
	encrypt = require('../utilities/encryption');


exports.getUsers =  function(request, response){
		User.find({}).exec(function(err, collection){
			response.send(collection);
		})
};

exports.createUser = function(request, response, next){
	var userData = request.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createsalt();
	userData.hashed_pwd = encrypt.hashpwd(userData.salt, userData.password); 
/*
it is the function to create the user
*/
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate User Name');
			}
			response.status(400);
			return response.send({reason:err.toString()});
		}
		request.logIn(user, function(err){
			if(err) {return next(err);}
			response.send(user);
		})
	})
};

exports.updateUser = function(request, response){
	var userUpdates = request.body;

	if(request.user._id != userUpdates._id && !request.user.hasRole('admin')){
	response.status(403);
	return response.end();
	}

	request.user.firstName = userUpdates.firstName;
	request.user.lastName = userUpdates.lastName;
	request.user.userName = userUpdates.userName;
	if(userUpdates.password && userUpdates.password.length > 0){
		request.user.salt = encrypt.createsalt();
		request.user.hashed_pwd = encrypt.hashpwd(request.user.salt, userUpdates.password);
	}
	request.user.save(function(err){
		if(err){
			response.status(400);
			return response.send({reason:err.toString()});
		}
		response.send(request.user);
	});
};