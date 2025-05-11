import PropTypes from "prop-types";
import { useState, createContext, useContext } from "react";

const AppContext = createContext();

const initialState = Object.freeze({
	appGeneral: {
		user: {},
		emails: [],
		exports: []
	},
	shopify: {
		shop: {},
		customers: [],
		customerTags: [],
		products: [],
		collections: [],
		productTags: []
	}
});

export function ContextProvider({ children }) {
	const [state, setState] = useState(initialState);
	return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
}

ContextProvider.propTypes = {
	children: PropTypes.node
};

export function useSelector(selectFunction = () => {}) {
	const [state, _setState] = useContext(AppContext);
	return selectFunction(state);
}

function getAttributeValue(source, payload) {
	if (payload && payload.constructor === Object) {
		return Object.keys(payload).reduce(function (accumulator, key) {
			const newValue = getAttributeValue(source[key], payload[key]);
			return { ...accumulator, [key]: newValue };
		}, source);
	} else {
		return payload;
	}
}

export function useDispatch() {
	const [_state, setState] = useContext(AppContext);

	return function (type, payload) {
		setState(function (state) {
			const newState = state.copy();
			const keys = type.split(".").filter((key) => key);
			const lastKey = keys.pop();
			const target = keys.reduce((object, key) => object[key], newState);
			target[lastKey] = getAttributeValue(target[lastKey], payload);
			return newState;
		});
	};
}
