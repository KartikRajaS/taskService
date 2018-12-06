/*jshint node:true */

var adminCtrl = require('./../controllers/fadmin/admin');
var error = require("./error");

/**
 * Creates an object of the exports module to be able to access controller function
 * @param appObj exports object connects the url to the controller function
 */

module.exports = function(appObj, authTokenLibObj, schemaValidator){
	appObj.get('/api/v1/admin/fetch_user', authTokenLibObj.ValidateAdminToken, adminCtrl.getUserDetails, adminCtrl.sendResponse, error);	//fetch all registered user details
};
