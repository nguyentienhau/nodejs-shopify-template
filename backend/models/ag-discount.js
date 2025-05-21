const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize = {}) {
	class AgDiscount extends Model {
		static associate(_models = {}) {}
	}

	AgDiscount.init(
		{
			code: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ""
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0
			},
			userOption: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0
			},
			userIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			planIds: {
				type: DataTypes.JSON,
				allowNull: false,
				defaultValue: []
			},
			priceOption: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0
			},
			priceAmount: {
				type: DataTypes.BIGINT,
				allowNull: false,
				defaultValue: 0
			},
			startAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			endAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		},
		{ sequelize, modelName: "AgDiscount", tableName: "ag_discount", underscored: true }
	);

	return AgDiscount;
};
