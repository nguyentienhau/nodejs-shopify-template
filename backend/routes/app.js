const { authenticate } = require("../middlewares");

module.exports = ["/ag-plan", "/ag-user"].map(function (requestPath = "") {
	return {
		url: requestPath,
		handler: async function (request = {}, response = {}) {
			try {
				const auth = await authenticate(request, response);

				if (auth.success) {
					const service = require("../services" + requestPath);
					const { type = "read", data = [] } = request.body;

					if (Object.hasOwn(service, type)) {
						const result = await service[type](auth.data, data);
						response.status(200).send(result);
					} else {
						response.status(200).send({ success: false, message: "Invalid type" });
					}
				} else {
					response.status(200).send(auth);
				}
			} catch (error) {
				response.status(200).send({ success: false, error, message: "Handle failed" });
			}
		}
	};
});
