const fs = require("fs");
const path = require("path");
const express = require("express");
require("./custom");
require("./setup-env");
const shopify = require("./shopify");
const PrivacyWebhookHandlers = require("./privacy");
const afterAuth = require("./after-auth");
const routes = require("./routes");

const PORT = parseInt(process.env.BACKEND_PORT || process.env.SHOPIFY_PORT || process.env.PORT || 3000);
const STATIC_PATH = __dirname + (process.env.NODE_ENV === "production" ? "/../frontend/dist" : "/../frontend");
const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), afterAuth, shopify.redirectToShopifyOrAppRoot());
app.post(shopify.config.webhooks.path, shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers }));

// If you are adding routes outside of the /api path, remember to also add a proxy rule for them in web/frontend/vite.config.js
app.use(express.json());
app.use("/api/*", shopify.validateAuthenticatedSession());

routes.forEach(function (route) {
	app.post("/api" + route.url, route.handler);
});

app.use(shopify.cspHeaders());
app.use(express.static(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async function (_request = {}, response = {}, _next = () => {}) {
	const filePath = path.resolve(STATIC_PATH, "index.html");
	const fileData = fs.readFileSync(filePath, { encoding: "utf8" });
	const htmlContent = fileData.toString().replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "");
	return response.status(200).set("Content-Type", "text/html").send(htmlContent);
});

app.listen(PORT);
