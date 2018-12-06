/*jshint node:true */
/**
 * Module dependencies.
 */


var constants = require('../../config/constants');
var async = require('async');
var _ = require('underscore');
var proctur_db = require('../../db/proctur_db');
var moment = require('moment');
var b = JSON.stringify;
var commonFunc = require('../../libs/commonFunc');
var logger = require('../../libs/logger');
const dbsequelize = require('./../../db/proctur_db').connection;

//get the user registered user details
exports.getUserDetails = function (req, res, next) {
	var sql = "SELECT ud.title, ud.first_name, ud.last_name, ud.gender, ud.email, ud.uuid, ud.username, a.street, a.city, a.state, a.postcode FROM "+constants.TABLES_NAME.USER_DETAILS+" as ud left outer join "+constants.TABLES_NAME.USER_ADDRESS+" as a on ud.user_id = a.user_id";
	dbsequelize.query(sql).then((res)=>{
		if(res[0].length>0){
			var result = commonFunc.mapUserData(res[0]);
			req.resData = {results : result}
			return next();
		}else{
			var err = new Error(constants.ERR_MSG.NO_DATA_FOUND);
			err.status = 400;
			return next(err);
		}
	}).catch(next);

};

exports.sendResponse = function (req, res, next) {
	res.json(req.resData);
};
