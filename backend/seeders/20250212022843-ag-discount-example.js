module.exports = {
	async up(queryInterface = {}, _Sequelize = {}) {
		const tableName = "ag_discount";
		const codes = ["example"];
		const rows = codes.map((code) => ({ code, name: code, user_ids: "[]", plan_ids: "[]" }));
		await queryInterface.bulkInsert(tableName, rows, {});
	},
	async down(queryInterface = {}, Sequelize = {}) {
		const tableName = "ag_discount";
		const codes = ["example"];
		const codeCondition = { [Sequelize.Op.in]: codes };
		await queryInterface.bulkDelete(tableName, { code: codeCondition }, {});
	}
};
