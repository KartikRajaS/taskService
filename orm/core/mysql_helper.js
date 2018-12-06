
var _ = require("underscore");
var Sequelize = require("sequelize");
var Transaction = Sequelize.Transaction;


function MysqlModel(model){
			this.modelObj = model;
}	

	 MysqlModel.prototype.findAndCountAll =  function(condition, selectParams,  order, limit, offset) {
		try{
			var obj = {};
			obj['where'] = condition;
			if(selectParams && Array.isArray(selectParams) && selectParams.length > 0){
				obj['attributes'] = selectParams;
			}
			if(order &&  Array.isArray(order) && order.length > 0){
				obj['order'] = order;
			}
			if(limit > 0){
				obj['limit'] = limit;
			}
			if(offset > 0){
				obj['offset'] = offset;
			}
			obj['raw'] = true;
			return this.modelObj.findAll(obj);
		}catch(error){
			throw error;
		}
	};

	 MysqlModel.prototype.findOne = function(condition) {
		try{
			return this.modelObj.findOne({where: condition, raw: true});
		}catch(error){
			throw error;
		}
	};

	 MysqlModel.prototype.save = function(data, trans) {
		try{
			return this.modelObj.create(data, trans).then( function(item){
				return item;
			}).catch( function (err) {
				throw err;
			});
		}catch(error){
			throw error;
		}
	};

	 MysqlModel.prototype.update = function(condition, data, trans) {
		try{
			return  this.modelObj.update(data, {where: condition, individualHooks: true}, trans).then( function(item){
				return item;
			}).catch( function (err) {
				throw err;
			});
		}catch(error){
			throw error;
		}
	};

	MysqlModel.prototype.bulkSave =  function(data, trans)  {
		try{
			return this.modelObj.bulkCreate(data, trans)
		}catch(error){
			throw error;
		}
	};

	 MysqlModel.prototype.destroy =  function(condition, trans){
		try {
			return this.modelObj.destroy({where: condition}, trans);
		}catch(error){
			throw error;
		}

	};

	 MysqlModel.prototype.customQuery =  function(conn, query){
		try{
			return conn.query(query).spread(  function (res, metadata) {
				_.each(res, function(item, key){
					res[key]  = JSON.parse(JSON.stringify(item));
				});
				return res;
			});
		}catch(error){
			throw error;
		}
	}

module.exports = MysqlModel;
