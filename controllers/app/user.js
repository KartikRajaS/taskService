var constants = require('../../config/constants');
var async        = require('async');
var _            = require('underscore');
var proctur_db 	 = require('../../db/proctur_db');
var moment = require('moment');
 var b = JSON.stringify;
 var commonFunc 	= require('../../libs/commonFunc');
 var logger 	 = require('../../libs/logger');
 const uuidv1 = require('uuid/v1');

 //Register new user
exports.registerUser = function (req, res, next) {
    var body = req.body;
    var uuid = uuidv1(body.email); 
    body['uuid'] = uuid;
    var userClient = new (proctur_db.client)(proctur_db.connection, constants.TABLES_NAME.USER_DETAILS);
    userClient.create(body).then((res)=>{
        if(res.dataValues){
            constants.SUCCESS_RESPONSE['message'] = 'User registered!';
            req.resData = constants.SUCCESS_RESPONSE;
            saveAddress(res.dataValues.user_id,body);
            return next();
        }else{
            var err = new Error("Regration Interrupted");
					err.status = 400;
					return next(err);
        }
    }).catch(next);

    function saveAddress(id,body){
        var addressobj = {
            user_id : id,
            street : body.street,
            city : body.city,
            state : body.state,
            postcode : body.postcode
        };
        var addrClient = new (proctur_db.client)(proctur_db.connection, constants.TABLES_NAME.USER_ADDRESS);
        addrClient.create(addressobj).then(console.log);
    }
};

exports.sendResponse = function(req, res,next){
    res.json(req.resData);
};
