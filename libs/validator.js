/**
 * @module lib/validator
 * @type {exports.Validator|*}
 */
var constants = require('./../config/constants');
var async = require('async');
var _ = require('underscore');
var Ajv = require('ajv');
var proctur_db      = require('../db/proctur_db');

/*
 class to validate JsonSchema and mapping DB attrubutes with api and vice versa
 */
exports.validate = function (req, res, next) {

    var url = req.path;
    /*
     * include the correponding validator from the validator folder, please ensure mapping is present in db_constants
     * file for new validator modules added
     */
    

    for (var key in constants.moduleNames) {
        if (url.indexOf(constants.moduleNames[key]) > -1) {
             var validatorObj = require('./../validator/'+key);
            break;
        }
    }
     
    var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    var instance = req.body;
    if (req.method === 'POST') {
        var schema = validatorObj.jsonSchema;
    }
    if (req.method === 'PUT') {
        //console.log('went into updateschema');
        var schema = validatorObj.updatejsonSchema;
    }
    try{
    var validate = ajv.compile(schema);
    var valid = validate(instance);

    }catch(e){
            console.log("\r\n\n\n .e ", e)
    }

    if (!valid) {
        console.log("\n\n error stack 2 ", JSON.stringify(validate.errors))
        showValidationErrorUpdated(validate.errors, req, res, next);
    } else {
         return next();
    }

    
};


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


function showValidationErrorUpdated(Errors, req, res, next) {
    var url = req.path;
    
        var errors = new Array();
        _.each(Errors, function (item) {
            if(item && item["message"]) {
                var error = '';
                if(item["dataPath"]) {
                    var schemaKey = item["dataPath"];
                    if(item["dataPath"].indexOf('.') > -1) {
                        schemaKey = item["dataPath"].split('.')[1];
                    }
                    error += schemaKey + ' ';
                }

                error += item["message"];
                errors.push(error);
            }
        });
        errors = errors.join(", ");
        var err = new Error(errors);
        err.status = 400 ;
        return next(err);

}
