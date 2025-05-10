import App from "./App";
import { createRoot } from "react-dom/client";
import { initI18n } from "./utilities/i18nUtils";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
	const root = createRoot(document.getElementById("app"));
	root.render(<App />);
});
