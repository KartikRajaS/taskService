'use strict';

var dbConfig = require('../config/mysqlConf').MYSQL.PROCTUR_SERVICE;

var db1 = new require('../orm');

var prcotur_db = db1(dbConfig);

module.exports = prcotur_db;