
var error = require("./error");
var UserCtrl = require('./../controllers/app/user');
var commonDBfunc = require('./../db/commonDbFunc');

/**
 * Creates an object of the exports module to be able to access controller function
 * @param appObj exports object connects the url to the controller function
 */

module.exports = function(appObj, authTokenLibObj, schemaValidator){
	appObj.post('/api/v1/user/register', schemaValidator.validate, commonDBfunc.ifEmailExist, UserCtrl.registerUser, UserCtrl.sendResponse, error);	//Register new user
};
