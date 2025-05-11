"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgDiscount extends Model {
		static associate(_models = {}) {}
	}

	AgDiscount.init(
		{
			code: DataTypes.STRING,
			name: DataTypes.STRING,
			status: DataTypes.TINYINT,
			userOption: DataTypes.TINYINT,
			userIds: DataTypes.JSON,
			planIds: DataTypes.JSON,
			priceOption: DataTypes.TINYINT,
			priceAmount: DataTypes.BIGINT,
			startAt: DataTypes.DATE,
			endAt: DataTypes.DATE
		},
		{ sequelize, modelName: "AgDiscount", tableName: "ag_discount", underscored: true }
	);

	return AgDiscount;
};
