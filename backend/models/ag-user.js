const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgUser extends Model {
		static associate(models = {}) {
			this.belongsTo(models["AgPlan"], { foreignKey: "planId" });
		}
	}

	AgUser.init(
		{
			domain: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0
			},
			planId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
			},
			chargeId: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			rechargeAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		},
		{ sequelize, modelName: "AgUser", tableName: "ag_user", underscored: true }
	);

	return AgUser;
};
