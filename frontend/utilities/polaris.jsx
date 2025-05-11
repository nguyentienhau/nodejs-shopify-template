import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import { getPolarisTranslations } from "./i18n";
import "@shopify/polaris/build/esm/styles.css";

function AppBridgeLink({ url, children, external, ...rest }) {
	const navigate = useNavigate();
	const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

	return external || IS_EXTERNAL_LINK_REGEX.test(url) ? (
		<a {...rest} href={url} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	) : (
		<a {...rest} onClick={() => navigate(url)}>
			{children}
		</a>
	);
}

AppBridgeLink.propTypes = {
	url: PropTypes.string,
	external: PropTypes.bool,
	children: PropTypes.node
};

export function PolarisProvider({ children }) {
	const translations = getPolarisTranslations();

	return (
		<AppProvider i18n={translations} linkComponent={AppBridgeLink}>
			{children}
		</AppProvider>
	);
}

PolarisProvider.propTypes = {
	children: PropTypes.node
};
