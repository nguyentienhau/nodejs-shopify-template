"use strict";

module.exports = {
	async up(queryInterface = {}, _Sequelize = {}) {
		const tableName = "ag_user";
		const rows = [{ domain: "test.example.com", status: true, plan_id: 1 }];
		await queryInterface.bulkInsert(tableName, rows, {});
	},
	async down(queryInterface = {}, Sequelize = {}) {
		const tableName = "ag_user";
		const domains = ["test.example.com"];
		await queryInterface.bulkDelete(tableName, { domain: { [Sequelize.Op.in]: domains } }, {});
	}
};
