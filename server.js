var express = require('express');

//global environment variable
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
//including the config data which matches our environment by [env]
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(config.port,function(err){
	if(err) throw err;
	console.log("listening to the port :"+ config.port);
});