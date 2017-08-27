var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose');

//global environment variable
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

//middleware function for stylus
function compile(str, path) {
	return stylus(str).set('filename',path);
}

/*setting the views property (last string is the path of the view)
 following the next comment is the setting up of the jade view engine*/
app.set('views',__dirname + '/server/views');
//setting the view engine
app.set('view engine','jade');

app.use(logger('dev'));

//setting up the bodyparser properties
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//using the stylus middleware
app.use(stylus.middleware(
{
	src:__dirname + '/public',
	compile:compile
}
));


//this is for the static routing
app.use(express.static(__dirname+'/public'));

//mongoose connection
if(env ==='development'){
	console.log("****DEVELOPMENT****");
	mongoose.connect('mongodb://localhost/multivision');
}else{
	console.log("****PRODUCTION****");
	mongoose.connect('mongodb://Gowtham:multivision@ds021046.mlab.com:21046/multivision',{useMongoClient: true});
}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error...'));
db.once('open',function callback(){
console.log('multivision db opened');
});

//Mongoose Schema
var Schema = mongoose.Schema;
var messageSchema= new Schema({message:String},{collection:"messages"});
//variable to create model
var message = mongoose.model('message',messageSchema);
//variable to store the mongodb
var mongoMessage;

//Mongoose query to find one 
message.findOne().exec(function(err,messageDoc){
mongoMessage=messageDoc.message;
});

//general routing in express
app.get('/partials/:partialPath',function(request,response){
	console.log("partials Route");
	response.render('partials/'+request.params.partialPath);
})

app.get('*',function(request, response){
	console.log("******Asterix Route******");
	response.render('index',{
		mongoMessage: mongoMessage
	});
});

var port=process.env.PORT || 3030;
app.listen(port,function(err){
	if(err) throw err;
	console.log("listening to the port :"+ port);
});