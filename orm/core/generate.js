var SequelizeAuto = require('sequelize-auto');

module.exports.generate = function (config, options, callback) {
	options.logging = false;
    let auto = new SequelizeAuto(config.database, config.user, config.password, options);

    auto.run(function(err) {
        if (err) throw err;
        console.log("Schema initialization done");
        callback(auto);
    })
}


