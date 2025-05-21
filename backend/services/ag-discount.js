const { Op } = require("sequelize");
const { AgDiscount } = require("../models");

function getItemData(data = {}) {
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
}
module.exports = {
	read: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const options = data.length > 0 ? { where: { [Op.or]: data.map(getItemData) } } : {};
				const result = await AgDiscount.findAll(options);
				return { success: true, data: result, message: "Read successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Read failed" };
		}
	},
	upsert: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const options = { updateOnDuplicate: ["id"] };
				const result = await AgDiscount.bulkCreate(data.map(getItemData), options);
				return { success: true, data: result, message: "Save successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Save failed" };
		}
	},
	delete: async function (_agUser = {}, data = []) {
		try {
			if (data && data.isArray()) {
				const options = data.length > 0 ? { where: { [Op.or]: data.map(getItemData) } } : {};
				const result = await AgDiscount.destroy(options);
				return { success: true, data: result, message: "Delete successfully" };
			} else {
				return { success: false, message: "Invalid data" };
			}
		} catch (error) {
			return { success: false, error, message: "Delete failed" };
		}
	}
};
