module.exports = {
	async up(queryInterface = {}, _Sequelize = {}) {
		const tableName = "ag_user";
		const domains = ["test.example.com"];
		const rows = domains.map((domain) => ({ domain }));
		await queryInterface.bulkInsert(tableName, rows, {});
	},
	async down(queryInterface = {}, Sequelize = {}) {
		const tableName = "ag_user";
		const domains = ["test.example.com"];
		const domainCondition = { [Sequelize.Op.in]: domains };
		await queryInterface.bulkDelete(tableName, { domain: domainCondition }, {});
	}
};
