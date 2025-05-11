import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import { ContextProvider, PolarisProvider, initI18n } from "./utilities";
import { NotFound } from "./components/common";

function useRoutes(pages) {
	const routes = Object.keys(pages)
		.map((key) => {
			let path = key
				.replace("./pages", "")
				.replace(/\.(t|j)sx?$/, "")
				.replace(/\/index$/i, "/")
				.replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

			if (path.endsWith("/") && path !== "/") {
				path = path.substring(0, path.length - 1);
			}

			if (!pages[key].default) {
				console.warn(`${key} doesn't export a default React component`);
			}

			return {
				path,
				component: pages[key].default
			};
		})
		.filter((route) => route.component);

	return routes;
}

function App() {
	const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
	const routes = useRoutes(pages);
	const { t } = useTranslation();

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
						<Route path="*" element={<NotFound />} />
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
