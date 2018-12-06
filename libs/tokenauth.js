/**
 * Token Library ,Here token encoding and decoding is done
 * @module lib/tokenauth
 */
var jwt   = require('jsonwebtoken');
var url = require('url');
var config = require('./../config/constants.js');
var async = require('async');
var util = require('./commonFunc');
var proctur_db           = require('../db/proctur_db');
var MD5     		= require('md5');

var atob = require('atob');
var constants = require('../config/constants');

/**
 * middleware function to generate a token
 **/

module.exports.ValidateAdminToken = function(req, res, next){
  var parsed_url = url.parse(req.url, true);
    var authHeader = (req.body && req.body.auth_token) || parsed_url.query.auth_token || req.headers["x-auth-token"] || req.headers["auth-token"];
    if (authHeader) {
        var  tokenBase64 = Buffer.from(authHeader, 'base64').toString('ascii');
         jwt.verify(tokenBase64, config.SECRETTOKEN, function(err, decoded) {
            if(err) {
                console.log("jwt.decode failed" + err);
                var err = new Error(constants.ERR_MSG.INVALID_AUTH_TOKEN);
                err.status = 401 ;
                return next(err);
            }
            if(decoded.type == "admin"){
                var adminSessionClient = new (proctur_db.client)(proctur_db.connection, constants.TABLES_NAME.ADMIN_SESSION);
                adminSessionClient.findOne({token : tokenBase64, is_logged: 1}).then(function(res){
                     if(res){
                        req.admin = res;
                        return next();
                    }else{
                        var err = new Error(constants.ERR_MSG.INVALID_USER);
                        err.status = 403 ;
                        return next(err);
                    }
                }).catch(function(err){
                    var err = err || new Error(constants.ERR_MSG.INVALID_AUTH_TOKEN);
                    err.status = 401 ;
                    return next(err);
                });
            }else{
                    var err = err || new Error(constants.ERR_MSG.INVALID_AUTH_TOKEN);
                    err.status = 401 ;
                    return next(err);
            }

        });

    } else {
        var err = new Error(constants.ERR_MSG.INVALID_AUTH_TOKEN);
        err.status = 403 ;
        return next(err);
    }
};
