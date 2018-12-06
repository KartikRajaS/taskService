/*jshint node:true */

/**
 * Module dependencies.
 */
var proctur_db 	 = require('./../db/proctur_db');

var constants = require('../config/constants');

exports.ifEmailExist = function (req, res, next) {
	var err = null; 
	var userClient = new (proctur_db.client)(proctur_db.connection, constants.TABLES_NAME.USER_DETAILS);
	userClient.find({email : req.body.email}).then((res)=>{
		if (res.length > 0) {
			err = new Error(constants.ERR_MSG.EMAIL_EXIST);
			err.status = 400;
		}
		return next(err);
	});
}
