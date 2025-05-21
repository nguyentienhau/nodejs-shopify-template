import { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import { ContextProvider, PolarisProvider, initI18n } from "./utilities";

function App() {
	const { t } = useTranslation();
	const routes = useMemo(function () {
		const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
		return Object.entries(pages)
			.filter((entry) => entry[1].default)
			.map(function (entry) {
				let path = entry[0]
					.replace("./pages", "")
					.replace(/\.(t|j)sx?$/, "")
					.replace(/\/index$/i, "/")
					.replace(/\./g, "/")
					.replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

				if (path.endsWith("/") && path !== "/") {
					path = path.substring(0, path.length - 1);
				}

				return { path, component: entry[1].default };
			});
	}, []);

	return (
		<ContextProvider>
			<PolarisProvider>
				<BrowserRouter>
					<NavMenu>
						<Link to="/" rel="home" />
						<Link to="/page-name">{t("NavigationMenu.pageName")}</Link>
					</NavMenu>
					<Routes>
						{routes.map(function ({ path, component: Component }) {
							return <Route key={path} path={path} element={<Component />} />;
						})}
						<Route path="*" element={t("NotFound.description")} />
					</Routes>
				</BrowserRouter>
			</PolarisProvider>
		</ContextProvider>
	);
}

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
	const rootElement = document.getElementById("root");
	createRoot(rootElement).render(<App />);
});
