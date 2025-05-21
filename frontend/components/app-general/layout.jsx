import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "@frontend/utilities";
import { AgHelpers } from "@frontend/helpers";

export function Layout({ children = "" }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	async function fetchData() {
		const [userResponse, shopResponse] = await Promise.all([
			AgHelpers.request("/ag-user", { type: "read" }),
			AgHelpers.request("/sa-shop", { type: "read" })
		]);

		if (userResponse.success && userResponse.data.id && shopResponse.success && shopResponse.data.id) {
			dispatch("appGeneral.user", userResponse.data);
			dispatch("shopifyAdmin.shop", shopResponse.data);
			setLoading(false);
		}
	}

	useEffect(function () {
		fetchData();
	}, []);

	return loading ? null : children;
}

Layout.propTypes = {
	children: PropTypes.node
};
