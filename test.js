var mongoose = require('mongoose');
//mongoose connection
mongoose.connect('mongodb://Gowtham:multivision@ds021046.mlab.com:21046/multivision');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error...'));
db.once('open',function callback(){
console.log('multivision db opened');
});

/*
//Mongoose Schema
var Schema = mongoose.Schema;
var messageSchema= new Schema({message:String},{collection:"message"});
//variable to create model
var Message = mongoose.model('Message',messageSchema);
//variable to store the mongodb
var mongoMessage;

//Mongoose query to find one 
Message.findOne().exec(function(err,messageDoc){
console.log(messageDoc.message);
mongoMessage=messageDoc;
});
*/