/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tb_user_details', {
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(5),
			allowNull: false
		},
		first_name: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		gender: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		uuid: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING(120),
			allowNull: false
		}
	}, {
		tableName: 'tb_user_details'
	});
};
