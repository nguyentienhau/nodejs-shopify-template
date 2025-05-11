const dateSample = new Date(0);

export const AgPlans = Object.freeze([
	{ id: 0, code: "", name: "" },
	{ id: 1, code: "v1-free", name: "Free Plan" },
	{ id: 2, code: "v1-starter", name: "Starter Plan" },
	{ id: 3, code: "v1-advanced", name: "Advanced Plan" },
	{ id: 4, code: "v1-premium", name: "Premium Plan" }
]);

export const AgModules = Object.freeze([
	{ id: 0, code: "", name: "", planIds: [] },
	{ id: 1, code: "request-quote", name: "Request Quote", planIds: [1, 2, 3, 4] },
	{ id: 2, code: "pay-later", name: "Pay Later", planIds: [1, 2, 3, 4] },
	{ id: 3, code: "quick-order", name: "Quick Order", planIds: [1, 2, 3, 4] },
	{ id: 4, code: "company-account", name: "Company Account", planIds: [1, 2, 3, 4] },
	{ id: 5, code: "sales-rep", name: "Sales Rep", planIds: [1, 2, 3, 4] }
]);

export const AgDiscountSample = Object.freeze({
	id: 0,
	status: false,
	userOption: 0,
	userIds: [],
	planIds: [],
	priceOption: 0,
	priceAmount: 0,
	startAt: dateSample,
	endAt: dateSample,
	createdAt: dateSample,
	updatedAt: dateSample
});

export const AgPlanSample = Object.freeze({
	id: 0,
	code: "",
	name: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const AgModuleSample = Object.freeze({
	id: 0,
	code: "",
	name: "",
	planIds: [],
	createdAt: dateSample,
	updatedAt: dateSample
});

export const AgUserSample = Object.freeze({
	id: 0,
	domain: "",
	token: "",
	status: false,
	planId: 0,
	chargeId: "",
	rechargeAt: dateSample,
	createdAt: dateSample,
	updatedAt: dateSample
});

export const AgEmailSample = Object.freeze({
	id: 0,
	userId: 0,
	status: false,
	sendFrom: "",
	template: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const AgExportSample = Object.freeze({
	id: 0,
	userId: 0,
	template: "",
	createdAt: dateSample,
	updatedAt: dateSample
});

export const FormFieldSamples = {
	text: {
		id: "",
		type: "text",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	email: {
		id: "",
		type: "email",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	number: {
		id: "",
		type: "number",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	password: {
		id: "",
		type: "password",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	checkbox: {
		id: "",
		type: "checkbox",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	file: {
		id: "",
		type: "file",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		visible: true,
		default: false
	},
	textarea: {
		id: "",
		type: "textarea",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		rows: 2,
		cols: 4,
		visible: true,
		default: false
	},
	heading: {
		id: "",
		type: "heading",
		label: "Default title",
		helpText: "",
		visible: true,
		default: false
	},
	divider: {
		id: "",
		type: "divider",
		label: "Divider",
		visible: true,
		default: false
	},
	select: {
		id: "",
		type: "select",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		options: [],
		visible: true,
		default: false
	},
	radios: {
		id: "",
		type: "radios",
		required: false,
		label: "Default title",
		helpText: "",
		placeholder: "",
		value: "",
		options: [],
		visible: true,
		default: false
	}
};
