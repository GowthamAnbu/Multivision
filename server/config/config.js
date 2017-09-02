//rootfile server.js
var path = require('path');
//setting the rootpath to the server.js since we are in /server/config/
var rootPath = path.normalize(__dirname +'/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/multivision',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://Gowtham:multivision@ds021046.mlab.com:21046/multivision',
		port: process.env.PORT || 80
	}
}