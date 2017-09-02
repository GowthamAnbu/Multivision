//rootfile route.js
/*
primaryily this code was in route.js since it involved so many functionalities 
this separate auth.js file is created :)
*/
var passport = require('passport');

exports.authenticate = function(request, response, next){
		request.body.username = request.body.username.toLowerCase(); 
		var auth = passport.authenticate('local',function(err, user){
			if(err){return next(err);}
			if(!user){response.send({success:false});}
			/*passport primarily adds the login to the request object 
			but in the custom login developer has to set the send object to response object
			*/
			request.logIn(user, function(err){
				if(err){return next(err);}
				response.send({success:true, user:user});
			})
		})
		/*
		one has to call the auth in code no:4 since it is a module page which exports
		the entire data and for calling we are using the code no:25 because the auth function
		has a callback
		*/
		auth(request, response, next);
};
/*
request.isAuthenticated() is a default function in passport
which returns true if the user is logged in 
else false
*/
exports.requiresApiLogin = function(request, response, next){
	if(!request.isAuthenticated()){
		response.status(403);
		response.end();
	} else{
		next();
	}
};
/*
requiresRole is created to check whether logged in as well as is admin
to authorize the users
*/
exports.requiresRole = function(role){
	return function(request, response, next){
		if(!request.isAuthenticated() || request.user.roles.indexOf(role) === -1){
			response.status(403);
			response.end();
		} else{
			next();
		}
	}
}