const jwt = require("jsonwebtoken");
const { AgUser } = require("../models");
const { AgUserStatus } = require("../constants");

module.exports = async function (request = {}, response = {}) {
	try {
		const { shop = "", accessToken = "" } = response.locals.shopify.session;
		const sessionToken = request.headers["authorization"].replace("Bearer ", "");
		const secretKey = process.env.SHOPIFY_API_SECRET_KEY;
		const decoded = jwt.verify(sessionToken, secretKey, { ignoreExpiration: true });
		const domain = decoded.dest?.replace(/^https:\/\//, "");

		if (shop === domain) {
			const condition = { domain, token: accessToken, status: AgUserStatus.active };
			const agUser = await AgUser.findOne({ where: condition });

			if (agUser && agUser.id) {
				return { success: true, data: agUser };
			} else {
				return { success: false, message: "User not found" };
			}
		} else {
			return { success: false, message: "Authenticate failed" };
		}
	} catch (error) {
		return { success: false, error, message: "Authenticate failed" };
	}
};
