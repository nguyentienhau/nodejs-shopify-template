"use strict";

const { AgPlan } = require("../../models");
const { serviceHelpers } = require("../../helpers");

module.exports = serviceHelpers.createBasicServices(AgPlan, function (data = {}) {
	return Object.entries(data).reduce(function (result = {}, entry = []) {
		const [key = "", value = ""] = entry;

		if (value !== null && value !== undefined) {
			if (
				(["code", "name"].includes(key) && value.isString()) ||
				(["id", "version"].includes(key) && value.isNumber() && value > 0)
			) {
				result[key] = value;
			}
		}

		return result;
	}, {});
});
