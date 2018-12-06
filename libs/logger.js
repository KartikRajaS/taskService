/**
 *
 * @module lib/logger
 * @type {exports}
 */
var config = require('../config/constants');
var winston = require('winston');
var appRoot = require('app-root-path');


const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      level: 'info'
    }),
    new winston.transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: 'error'
    })
  ]
});

module.exports = logger