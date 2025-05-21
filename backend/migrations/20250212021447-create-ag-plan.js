module.exports = {
	async up(queryInterface = {}, Sequelize = {}) {
		await queryInterface.createTable("ag_plan", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			code: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				defaultValue: ""
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: ""
			},
			version: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 1
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(0)
			}
		});
	},
	async down(queryInterface = {}, _Sequelize = {}) {
		await queryInterface.dropTable("ag_plan");
	}
};
