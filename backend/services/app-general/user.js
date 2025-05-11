"use strict";

const { AgUser } = require("../../models");
const { serviceHelpers } = require("../../helpers");

module.exports = serviceHelpers.createBasicServices(AgUser, function (data = {}) {
	return Object.entries(data).reduce(function (result = {}, entry = []) {
		const [key = "", value = ""] = entry;

		if (value !== null && value !== undefined) {
			if (
				(["domain", "token", "chargeId", "rechargeAt"].includes(key) && value.isString()) ||
				(["status"].includes(key) && value.isNumber()) ||
				(["id", "planId"].includes(key) && value.isNumber() && value > 0)
			) {
				result[key] = value;
			}
		}

		return result;
	}, {});
});
