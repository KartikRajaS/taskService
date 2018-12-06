/*jshint node:true */

var env = process.env.NODE_ENV || 'development';

module.exports = function(err, req, res, next) {
    console.log(err);
  var errorStatus = err.status || 500;
  var response = {
    validate : false,
    errors : {
        code : err.code || 1000,
        message : err.message
    },
  };
  if(err.code) {
    response.errorcode = err.code;
  }
  
  res.status(errorStatus).json(response);

};