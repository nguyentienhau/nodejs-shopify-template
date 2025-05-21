import PropTypes from "prop-types";
import { Checkbox, FormLayout, TextField } from "@shopify/polaris";

export function InputForm({ data = {}, onChange = () => {}, errors = {} }) {
	function handleChangeAttributes(value = {}) {
		onChange({ ...data, ...value });
	}

	return (
		<FormLayout>
			<FormLayout.Group condensed>
				<Checkbox
					label="Required"
					checked={data.required}
					onChange={(value) => handleChangeAttributes({ required: value })}
				/>
				<Checkbox
					label="Visible"
					checked={data.visible}
					onChange={(value) => handleChangeAttributes({ visible: value })}
				/>
			</FormLayout.Group>
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
			{["checkbox", "file"].includes(data.type) ? null : (
				<FormLayout.Group condensed>
					<TextField
						label="Placeholder"
						value={data.placeholder}
						onChange={(value) => handleChangeAttributes({ placeholder: value })}
					/>
					<TextField
						type={data.type}
						label="Default value"
						value={data.value}
						onChange={(value) => handleChangeAttributes({ value })}
					/>
				</FormLayout.Group>
			)}
		</FormLayout>
	);
}

InputForm.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		required: PropTypes.bool,
		label: PropTypes.string,
		helpText: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
		visible: PropTypes.bool,
		default: PropTypes.bool
	}),
	onChange: PropTypes.func,
	errors: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		required: PropTypes.string,
		label: PropTypes.string,
		helpText: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
		visible: PropTypes.string,
		default: PropTypes.string
	})
};
