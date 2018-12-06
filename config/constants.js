/*
 *below object mapping added to map which validator file to load up for corresponding name mentioned in url, modulename:urlmappingname
 * the keys can be used as module names
 */
exports.moduleNames = {
	'user':'user'
};

exports.SECRETTOKEN = process.env.NODE_ENV ||  'production';


exports.TABLES_NAME = {
	USER_DETAILS : 'tb_user_details',
	ADMIN_SESSION : 'admin_session',
	USER_ADDRESS : 'user_address'
};

exports.AUTH = 'X-Auth-token';
exports.BASIC = 'basic';
exports.TOKEN = 'token';

exports.ERR_MSG = {
	EMAIL_EXIST : "Email id already exist",
	NO_DATA_FOUND : "No Data Found"
}

//Define level of error (values: debug,info,error,warn)
exports.ERROR_LEVEL_DEBUG = 'debug';
exports.ERROR_LEVEL_INFO = 'info';
exports.ERROR_LEVEL_ERROR = 'error';
exports.ERROR_LEVEL_WARN = 'warn';

exports.ERROR_TRANSPORT = ['file','console'];
exports.ERROR_TRANSPORT_LOG_FILE_PATH = 'app.log';
