/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin_session', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		admin_id: {
			type: DataTypes.INTEGER(10),
			allowNull: false
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		is_logged: {
			type: DataTypes.INTEGER(2),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(120),
			allowNull: true
		}
	}, {
		tableName: 'admin_session'
	});
};
