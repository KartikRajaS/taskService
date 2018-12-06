/*jshint node:true */

var logger = require('../libs/logger');

var config = {
    ENVIRONMENT: process.env.NODE_ENV || 'development',
    "DEVELOPMENT": {
        MYSQL: { // NOTE : These are implicit settings , aka - they will be passed directly



            'PROCTUR_SERVICE': {
                database: "task_service",
                user: "root",
                password: "gurgaon@123",
                host: "localhost",
                port: "3306",
                dialect: "mysql",
                storage: ":memory:",
                options: {
                    tables: '',
                    logging: logger.info,
                    camelCase: false,
                    timestamps: false,
                    underscored: true
                },
                pool: {
                    max: 10,
                    min: 0,
                    idle: 10000
                },
                define: {
                    timestamps: true
                }
            }
        }
    },
    'COMMON': {

        MYSQL_QUERY_TIMEOUT: 60000, // milliseconds
        DEBUG: false
    }
};

var load = function () {
    var env = config.ENVIRONMENT.toUpperCase();
    env = env === 'PRODUCTION' ? env : 'DEVELOPMENT';
    var loadedConfig = config.COMMON;
    Object.keys(config[env]).forEach(function (cluster) {
        loadedConfig[cluster] = {};
        Object.keys(config[env][cluster]).forEach(function (key) {
            loadedConfig[cluster][key] = config[env][cluster][key];
        });
    });
    return loadedConfig;
};



module.exports = load();
