//rootfile server.js
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config){
	//middleware function for stylus
	function compile(str, path) {
		return stylus(str).set('filename',path);
	}

	/*setting the views property (last string is the path of the view)
	 following the next comment is the setting up of the jade view engine*/
	app.set('views',config.rootPath + '/server/views');
	//setting the view engine
	app.set('view engine','jade');

	app.use(logger('dev'));

	//cookie parser
	app.use(cookieParser());

	//setting up the bodyparser properties
	app.use(bodyparser.urlencoded({extended:true}));
	app.use(bodyparser.json());

	//passport session key , initalization, session
	app.use(session({secret:'multi vision unicorns', resave:false, saveUninitialized:false}));
	app.use(passport.initialize());
	app.use(passport.session());

	//using the stylus middleware
	app.use(stylus.middleware(
	{
		src:config.rootPath + '/public',
		compile:compile
	}
	));

	//this is for the static routing
	app.use(express.static(config.rootPath+'/public'));
}