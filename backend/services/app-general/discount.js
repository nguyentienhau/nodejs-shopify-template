"use strict";

const { AgDiscount } = require("../../models");
const { serviceHelpers } = require("../../helpers");

module.exports = serviceHelpers.createBasicServices(AgDiscount, function (data = {}) {
	return Object.entries(data).reduce(function (result = {}, entry = []) {
		const [key = "", value = ""] = entry;

		if (value !== null && value !== undefined) {
			if (
				(["code", "name", "startAt", "endAt"].includes(key) && value.isString()) ||
				(["status", "userOption", "priceOption", "priceAmount"].includes(key) && value.isNumber()) ||
				(["userIds", "planIds"].includes(key) && value.isArray()) ||
				(["id"].includes(key) && value.isNumber() && value > 0)
			) {
				result[key] = value;
			}
		}

		return result;
	}, {});
});
