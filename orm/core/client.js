
var _ = require("underscore");
var Sequelize = require("sequelize");
var schemaClient = require("./schemas").SchemaClient;
var MysqlModel = require("./mysql_helper");
var a = console.log;
var b = JSON.stringify;

function Client (conn, collection){
    try {
            let models =   schemaClient.getModels(conn, collection);
            if(models){
                this.mysqlSchema = models;
            }
            this.WrapperObj =  new (MysqlModel)(this.mysqlSchema);
        } catch(e) {
            throw e;
        }
}

   

     Client.prototype.find= function(condition,  selectParams, order, limit, offset ) {
        try {
            return this.WrapperObj.findAndCountAll(condition, selectParams, order, limit, offset);
        } catch(e) {
            throw e;
        }
    };

    Client.prototype.findOne = function(condition ) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var res = _this.WrapperObj.findOne(condition);
                resolve(res);
            } catch(e) {
                reject(e);
            }
        });
    };

    Client.prototype.create=  function(data) {
        var __this = this;
        try{
            return __this.WrapperObj.save(data);
        }catch(error){
            throw error;
        }
    };

    Client.prototype.update = function(condition, data) {
        var __this = this;
        try{
            return __this.WrapperObj.update(condition, data);
        }catch(error){
            throw error;
        }
    };

    Client.prototype.destroy = function(condition) {
        try {
            return this.WrapperObj.destroy(condition);
        } catch(e) {
            throw e;
        }
    };
    
    Client.prototype.bulkCreate = function(data) {
        try {
            return this.WrapperObj.bulkSave(data);
        } catch(error) {
            throw error;
        }
    };


module.exports = Client;
