
var cls = require("continuation-local-storage");
var Sequelize = require("sequelize");

function MysqlConnection(){

      return function connect(config) {
        // if(this.mysqlInstance){
        //     return this.mysqlInstance;
        // } 
        
        (Sequelize).cls = cls.createNamespace("sequelize-transaction");
        this.mysqlInstance = new Sequelize( config.database,
            config.user,
            config.password,
            {
                isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
                host: config.host,
                dialect : config.dialect,
                define: {
                    timestamps: config.options.timestamps,
                    underscored: config.options.underscored,
                    camelCase: config.options.camelCase
                },
                pool: config.pool,
                logging: config.options.logging
            }
        );
        this.mysqlInstance.sync().then(function() {
            console.log("mysql connection created.")
        });
        return this.mysqlInstance;
    }
}

module.exports = MysqlConnection;
