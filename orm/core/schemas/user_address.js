/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_address', {
		user_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true
		},
		street: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		city: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		state: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		postcode: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		}
	}, {
		tableName: 'user_address'
	});
};
