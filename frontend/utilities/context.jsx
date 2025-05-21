import PropTypes from "prop-types";
import { useState, createContext, useContext } from "react";
import { AgUserSample, SaShopSample } from "@frontend/constants";

const AppContext = createContext();

const initialState = Object.freeze({
	appGeneral: {
		user: AgUserSample
	},
	shopifyAdmin: {
		shop: SaShopSample,
		customers: [],
		customerTags: [],
		products: [],
		collections: [],
		productTags: []
	}
});

export function ContextProvider({ children = "" }) {
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

function getAttributeValue(source = {}, payload = {}, initial = {}) {
	if (payload && payload.constructor === Object) {
		return Object.keys(payload).reduce(function (accumulator = {}, key = "") {
			accumulator[key] = getAttributeValue(source[key], payload[key], initial[key]);
			return accumulator;
		}, source);
	} else {
		return payload ?? initial;
	}
}

export function useDispatch() {
	const [_state, setState] = useContext(AppContext);

	return function (type = "", payload = {}) {
		setState(function (state = {}) {
			const newState = state.deepCopy();
			const keys = type.split(".").filter((key = "") => key);
			const lastKey = keys.pop();
			const target = keys.reduce((object = {}, key = "") => object[key], newState);
			const initial = keys.reduce((object = {}, key = "") => object[key], initialState);
			target[lastKey] = getAttributeValue(target[lastKey], payload, initial[lastKey]);
			return newState;
		});
	};
}
