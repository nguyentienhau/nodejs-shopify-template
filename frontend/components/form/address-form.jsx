import PropTypes from "prop-types";
import { Checkbox, FormLayout, TextField } from "@shopify/polaris";

export function AddressForm({ data = {}, onChange = () => {}, errors = {} }) {
	function handleChangeAttributes(value = {}) {
		onChange({ ...data, ...value });
	}

	return (
		<FormLayout>
			<Checkbox
				label="Required"
				checked={data.required}
				onChange={(value) => handleChangeAttributes({ required: value })}
			/>
			<FormLayout.Group condensed>
				<TextField
					label="Label"
					value={data.label}
					onChange={(value) => handleChangeAttributes({ label: value })}
					error={errors.label}
				/>
				<TextField
					label="Help text"
					value={data.helpText}
					onChange={(value) => handleChangeAttributes({ helpText: value })}
				/>
			</FormLayout.Group>
			<FormLayout.Group condensed>
				<TextField
					label="Placeholder"
					value={data.placeholder}
					onChange={(value) => handleChangeAttributes({ placeholder: value })}
				/>
				<TextField
					label="Default value"
					value={data.value}
					onChange={(value) => handleChangeAttributes({ value })}
				/>
			</FormLayout.Group>
		</FormLayout>
	);
}

AddressForm.propTypes = {
	data: PropTypes.shape({}),
	onChange: PropTypes.func,
	errors: PropTypes.shape({})
};
