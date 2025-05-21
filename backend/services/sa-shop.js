const { ShopifyHelpers } = require("../helpers");

const shopReadQuery = `
	query shopReadQuery {
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

module.exports = {
	read: async function (session = {}, data = {}) {
		try {
			const response = await ShopifyHelpers.request(session, shopReadQuery, data);
			response.data = response.data?.shop;
			return response;
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	}
};
