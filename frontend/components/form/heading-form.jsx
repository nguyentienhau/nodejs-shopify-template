import PropTypes from "prop-types";
import { FormLayout, TextField, Checkbox } from "@shopify/polaris";

export function HeadingForm({ data = {}, onChange = () => {}, errors = {} }) {
	function handleChangeAttributes(value = {}) {
		onChange({ ...data, ...value });
	}

	return (
		<FormLayout>
			<Checkbox
				label="Visible"
				checked={data.visible}
				onChange={(value) => handleChangeAttributes({ visible: value })}
			/>
			<FormLayout.Group condensed>
				<TextField
					label="Label"
					value={data.label}
					onChange={(value) => handleChangeAttributes({ label: value })}
					error={errors.label ? "Label is " + errors.label : ""}
				/>
				<TextField
					label="Help text"
					value={data.helpText}
					onChange={(value) => handleChangeAttributes({ helpText: value })}
				/>
			</FormLayout.Group>
		</FormLayout>
	);
}

HeadingForm.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		label: PropTypes.string,
		helpText: PropTypes.string,
		visible: PropTypes.bool,
		default: PropTypes.bool
	}),
	onChange: PropTypes.func,
	errors: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		label: PropTypes.string,
		helpText: PropTypes.string,
		visible: PropTypes.string,
		default: PropTypes.string
	})
};
