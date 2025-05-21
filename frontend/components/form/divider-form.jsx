import PropTypes from "prop-types";
import { Checkbox } from "@shopify/polaris";

export function DividerForm({ data = {}, onChange = () => {} }) {
	function handleChangeAttributes(value = {}) {
		onChange({ ...data, ...value });
	}

	return (
		<Checkbox
			label="Visible"
			checked={data.visible}
			onChange={(value) => handleChangeAttributes({ visible: value })}
		/>
	);
}

DividerForm.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		label: PropTypes.string,
		visible: PropTypes.bool,
		default: PropTypes.bool
	}),
	onChange: PropTypes.func
};
