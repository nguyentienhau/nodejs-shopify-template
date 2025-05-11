"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgUser extends Model {
		static associate(models = {}) {
			this.belongsTo(models["AgPlan"], { foreignKey: "planId" });
		}
	}

	AgUser.init(
		{
			domain: DataTypes.STRING,
			token: DataTypes.STRING,
			status: DataTypes.TINYINT,
			planId: DataTypes.INTEGER,
			chargeId: DataTypes.STRING,
			rechargeAt: DataTypes.DATE
		},
		{ sequelize, modelName: "AgUser", tableName: "ag_user", underscored: true }
	);

	return AgUser;
};
