"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgPlan extends Model {
		static associate(models = {}) {
			this.hasMany(models["AgUser"], { foreignKey: "planId" });
		}
	}

	AgPlan.init(
		{
			code: DataTypes.STRING,
			name: DataTypes.STRING,
			version: DataTypes.INTEGER
		},
		{ sequelize, modelName: "AgPlan", tableName: "ag_plan", underscored: true }
	);

	return AgPlan;
};
