"use strict";

const { authenticate } = require("../middlewares");
const shopify = require("../shopify");

const serviceMethods = ["read", "upsert", "delete"];
const requestPaths = [
	"/shopify/shop",
	"/shopify/customer",
	"/shopify/product",
	"/shopify/collection",
	"/shopify/variant",
	"/shopify/draft-order",
	"/shopify/order",
	"/shopify/tag"
];

module.exports = requestPaths.map(function (requestPath = "") {
	return {
		url: requestPath,
		handler: async function (request = {}, response = {}) {
			try {
				const result = await authenticate(request, response);

				if (result.success) {
					const service = require("services" + requestPath);
					const { type = "read", ...requestData } = request.body;

					if (serviceMethods.includes(type)) {
						const session = response.locals.shopify.session;
						const client = new shopify.api.clients.Graphql({ session });
						const result = await service[type](client, requestData);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} else {
					response.status(200).send(result);
				}
			} catch (error) {
				response.status(500).send({ success: false, error, message: "Handle failed" });
			}
		}
	};
});
