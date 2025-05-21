const { authenticate } = require("../middlewares");

module.exports = ["/sa-shop"].map(function (requestPath = "") {
	return {
		url: requestPath,
		handler: async function (request = {}, response = {}) {
			try {
				const auth = await authenticate(request, response);

				if (auth.success) {
					const service = require("../services" + requestPath);
					const { type = "read", data = {} } = request.body;

					if (Object.hasOwn(service, type)) {
						const session = response.locals.shopify.session;
						const result = await service[type](session, data);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} else {
					response.status(200).send(auth);
				}
			} catch (error) {
				response.status(500).send({ success: false, error, message: "Handle failed" });
			}
		}
	};
});
