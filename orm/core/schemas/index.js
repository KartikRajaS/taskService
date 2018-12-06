
var mysql = require('../mysql_connection');
var path = require("path");
var fs = require("fs");
var _ = require("underscore");
var Sequelize = require("sequelize");
var a = console.log;
var b = JSON.stringify;
var  SchemaClient = {
   
     init: function() {
        this._models = {};
        this._basename = path.basename(module.filename);
    },

    readSchemas: function() {
         try {
        this._sequelize =  mysql();
        fs.readdirSync(__dirname).filter(function(file) {
            return (file !== this._basename) && (file !== "interfaces");
        }).forEach(function(file) {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model).name] = model;
            a('model file', model, file);
        });
          } catch(e) {
             a('exception ', e);
            throw e;
        }
        //association to check if it is working
        Object.keys(this._models).forEach(function(modelName) {
            if (typeof this._models[modelName].associate === "function") {
                this._models[modelName].associate(this._models);
            }
        });
    },

    getModels: function(conn, tablename) {
         var _this = this;
        var filePath = path.join(__dirname, tablename+'.js');
        if(!_this._models || !_this._models[tablename]){
            _this._sequelize =  conn;
            if (fs.existsSync(filePath)) {
                let model = this._sequelize.import(filePath);
                _this._models[model.name] = model;
                Object.keys(_this._models).forEach(function(modelName) {
                    if (typeof _this._models[modelName].associate === "function") {
                        _this._models[modelName].associate(this._models);
                    }
                });
                return _this._models[tablename];
            }else{
                return null;
            }
        }else{
            return _this._models[tablename]
        }
    },

    getSequelize: function() {
        return this._sequelize;
    }
}

SchemaClient.init();

module.exports.SchemaClient = SchemaClient;
