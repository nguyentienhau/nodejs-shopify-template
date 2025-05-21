const { ShopifyHelpers } = require("../helpers");

module.exports = {
	read: async function (session = {}, data = {}) {
		try {
			const queryString = `
				query {
					shop {
						id
						taxesIncluded
						plan {
							partnerDevelopment
							shopifyPlus
						}
					}
				}
			`;

			const response = await ShopifyHelpers.request(session, queryString, data);

			if (response.success) {
				return { ...response, data: response.data.shop };
			}
			return response;
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	}
};
