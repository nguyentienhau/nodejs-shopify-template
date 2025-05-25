const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configuration = require("../configurations").DatabaseConfigurations[process.env.NODE_ENV || "development"];

const database = { Sequelize, sequelize: new Sequelize(configuration) };

fs.readdirSync(__dirname)
	.filter(function (fileName = "") {
		const extensionIndex = fileName.lastIndexOf(".");
		return fileName !== path.basename(__filename) && extensionIndex > 0 && extensionIndex < fileName.length - 1;
	})
	.forEach(function (fileName = "") {
		const filePath = path.resolve(__dirname, fileName);
		const model = require(filePath)(database.sequelize);
		database[model.name] = model;
	});

Object.keys(database).forEach(function (modelName = "") {
	if (database[modelName].associate) {
		database[modelName].associate(database);
	}
});

module.exports = database;
