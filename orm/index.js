'use strict';

var connection = new (require("./core/mysql_connection"));
var generate = require('./core/generate');

 function polyloat(relationalConfig){
    


        var configOptions = Object.assign( {
                                        directory   :  __dirname+'/core/schemas',
                                        host        :  (relationalConfig || {}).host || 'localhost'
                                    },
                                    (relationalConfig || {}).options
                                );

        var db = connection(relationalConfig);
         generateSchema();
        
           

        function generateSchema() {
             generate.generate(relationalConfig, configOptions, function() {
            });
        }

         return {
             connection : db,
             client: require('./core/client')
            };
    
}

module.exports = polyloat;