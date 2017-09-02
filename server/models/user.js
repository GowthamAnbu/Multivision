/*
rootfile mongoose.js
server side validation is not implemented yet
*/
var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

var Schema= mongoose.Schema;
var userSchema = new Schema({
	firstName: {type:String/*,required:'{PATH} is required'*/},
	lastName: {type:String/*,required:'{PATH} is required'*/},
	userName: {
		type:String/*,
		required:'{PATH} is required',
		unique:true*/
	},
	salt: {type:String/*,required:'{PATH} is required'*/},
	hashed_pwd: {type:String/*,required:'{PATH} is required'*/},
	roles: [String]
});
/*
schema methods allows the object to call this methods to do easy functions
code no:26 is an example of getting the password and salt of particular
object
*/
userSchema.methods={
	authenticate: function(passwordToMatch){
		return encrypt.hashpwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.role.indexOf('admin') > -1;
	}
}
var User= mongoose.model('User',userSchema);

function createDefaultUsers() {
	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
		var salt,hash;
		salt = encrypt.createsalt();
		hash = encrypt.hashpwd(salt, 'joey');
		User.create({firstName:'Joey',lastName:'Chandler',userName:'joey@gmail.com',salt: salt,hashed_pwd: hash, roles:['admin']});
		salt = encrypt.createsalt();
		hash = encrypt.hashpwd(salt, 'john');
		User.create({firstName:'John',lastName:'Papa',userName:'john',salt: salt,hashed_pwd: hash, roles:[]});
		salt = encrypt.createsalt();
		hash = encrypt.hashpwd(salt, 'dhan');
		User.create({firstName:'Dhan',lastName:'Wahline',userName:'dhan@gmail.com',salt: salt,hashed_pwd: hash});
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;