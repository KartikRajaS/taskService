/**
 * File to hold all common library functions
 * @module lib/commonFunc
 */
const Sequelize = require('sequelize');
var randomstring = require("randomstring");
var proctur_db = require('../db/proctur_db');
var constants = require('./../config/constants');
var utf8 = require('utf8');
var _ = require('underscore');
var crypto = require('crypto');


exports.mapUserData = function (resultArr){
    var aRR = [];
    for(var i = 0 ; i<resultArr.length ; i++){
       var obj = {
           gender : resultArr[i].gender,
           name : {
                title : resultArr[i].title,
                first : resultArr[i].first_name,
                last : resultArr[i].first_name
           },
           location : {
               street : resultArr[i].street,
               city : resultArr[i].city,
               state : resultArr[i].state,
               postcode : resultArr[i].postcode
           },
           email : resultArr[i].email,
           uuid : resultArr[i].uuid,
           username : resultArr[i].username
       };
       aRR.push(obj);
    }
    return aRR;
};