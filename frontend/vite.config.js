import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "./.env.json";

for (const key in env) {
	process.env[key] = env[key];
}

if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
	throw new Error(
		"\n\nThe frontend build will not work without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command, for example:" +
			"\n\nSHOPIFY_API_KEY=<your-api-key> npm run build\n"
	);
}

process.env.VITE_SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;

const proxyOptions = {
	target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
	changeOrigin: false,
	secure: true,
	ws: false
};

const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, "") : "localhost";

let hmrConfig;
if (host === "localhost") {
	hmrConfig = {
		protocol: "ws",
		host: "localhost",
		port: 64999,
		clientPort: 64999
	};
} else {
	hmrConfig = {
		protocol: "wss",
		host: host,
		port: process.env.FRONTEND_PORT,
		clientPort: 443
	};
}

export default defineConfig({
	root: dirname(fileURLToPath(import.meta.url)),
	plugins: [react()],
	resolve: {
		preserveSymlinks: true,
		alias: {
			"@frontend": __dirname
		}
	},
	define: Object.entries(env).reduce(function (result, entry) {
		const [key, value] = entry;
		result[key] = JSON.stringify(value);
		return result;
	}, {}),
	server: {
		host: "localhost",
		port: process.env.FRONTEND_PORT,
		hmr: hmrConfig,
		proxy: {
			"^/(\\?.*)?$": proxyOptions,
			"^/api(/|(\\?.*)?$)": proxyOptions
		}
	}
});
