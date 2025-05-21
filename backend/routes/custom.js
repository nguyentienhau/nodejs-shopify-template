module.exports = [
	{
		url: "/session",
		handler: function (_request = {}, response = {}) {
			const session = response.locals.shopify.session;
			response.status(200).send({ success: true, data: session, message: "Read successfully" });
		}
	}
];
