const { AgUser } = require("./models");
const { AgUserStatus } = require("./constants");

module.exports = async function (_request = {}, response = {}, next = () => {}) {
	try {
		const { shop = "", accessToken = "" } = response.locals.shopify.session;
		const userData = { domain: shop, token: accessToken, status: AgUserStatus.active };
		const [result, _created] = await AgUser.upsert(userData);

		if (result && result.id) {
			next();
		} else {
			response.status(200).send({ success: false, message: "After auth failed" });
		}
	} catch (error) {
		response.status(200).send({ success: false, error, message: "After auth failed" });
	}
};
