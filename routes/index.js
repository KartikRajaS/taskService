/**
* main file for routing
*/

/**
* Token Auth object to be passed to other routes for token authentication
*/
var authTokenLibObj = require('./../libs/tokenauth');
var schemaValidator = require('./../libs/validator');

/**
* Sets the routers for all calls
* @param app Application object
* @param fs file system object
*/
module.exports = function(app, fs) {
	fs.readdirSync(__dirname).forEach(function (file, indexer) {
		if (file.indexOf('.js') < 0 || file == 'index.js' || file == 'error.js') {
			return true;
		} else {
				require('./' + file)(app, authTokenLibObj, schemaValidator);
		}
	})
}