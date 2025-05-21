const { BillingInterval } = require("@shopify/shopify-api");
const { shopifyApp } = require("@shopify/shopify-app-express");

const { restResources } = require("@shopify/shopify-api/rest/admin/" + process.env.SHOPIFY_API_VERSION);

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const _billingConfig = {
	"My Shopify One-Time Charge": {
		// This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
		amount: 5.0,
		currencyCode: "USD",
		interval: BillingInterval.OneTime
	}
};

module.exports = shopifyApp({
	api: {
		apiVersion: process.env.SHOPIFY_API_VERSION,
		apiKey: process.env.SHOPIFY_API_KEY,
		apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
		scopes: process.env.SHOPIFY_SCOPES,
		hostName: process.env.SHOPIFY_HOST.replace(/^https:\/\//, ""),
		hostScheme: "https",
		restResources,
		future: {
			customerAddressDefaultFix: true,
			lineItemBilling: true,
			unstable_managedPricingSupport: true
		},
		billing: undefined // or replace with billingConfig above to enable example billing
	},
	auth: {
		path: "/api/auth",
		callbackPath: "/api/auth/callback"
	},
	webhooks: {
		path: "/api/webhooks"
	}
});
