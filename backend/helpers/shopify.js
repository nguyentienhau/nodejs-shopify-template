const shopify = require("../shopify");

module.exports = {
	request: async function (session = {}, query = "", variables = {}) {
		const client = new shopify.api.clients.Graphql({ session });
		const response = await client.request(query, variables);

		if (response.errors) {
			return { success: false, errors: response.errors, message: "Fetch failed" };
		} else {
			return { success: true, data: response.data };
		}
	}
};
