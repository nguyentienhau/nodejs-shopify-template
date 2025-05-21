module.exports = {
	async up(queryInterface = {}, _Sequelize = {}) {
		const tableName = "ag_plan";
		const rows = [
			{ code: "v1-free", name: "Free Plan", version: 1 },
			{ code: "v1-starter", name: "Starter Plan", version: 1 },
			{ code: "v1-advanced", name: "Advanced Plan", version: 1 },
			{ code: "v1-premium", name: "Premium Plan", version: 1 }
		];
		await queryInterface.bulkInsert(tableName, rows, {});
	},
	async down(queryInterface = {}, Sequelize = {}) {
		const tableName = "ag_plan";
		const codes = ["v1-free", "v1-starter", "v1-advanced", "v1-premium"];
		const codeCondition = { [Sequelize.Op.in]: codes };
		await queryInterface.bulkDelete(tableName, { code: codeCondition }, {});
	}
};
