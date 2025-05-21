module.exports = {
	read: async function (agUser = {}) {
		return { success: true, data: agUser, message: "Read successfully" };
	}
};
