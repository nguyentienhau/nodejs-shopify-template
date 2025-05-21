import PropTypes from "prop-types";
import { Checkbox, FormLayout, TextField, Card, Button, InlineStack, Box } from "@shopify/polaris";
import { PlusCircleIcon, DragHandleIcon } from "@shopify/polaris-icons";
import { DragDrop } from "@frontend/components/resource";

export function SelectForm({ data = {}, onChange = () => {}, errors = {} }) {
	function handleChangeAttributes(value = {}) {
		onChange({ ...data, ...value });
	}

	function handleAddOption() {
		const uniqueId = new Date().getTime().toString();
		const newOption = { label: "Option " + uniqueId, id: uniqueId };
		onChange({ ...data, options: data.options.concat(newOption) });
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
			{["radios"].includes(data.type) ? null : (
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
			)}
			<DragDrop
				label="Options"
				items={data.options}
				onChange={(value) => handleChangeAttributes({ options: value })}
				renderItem={function (item, index) {
					function changeLabel(value = "") {
						const newOption = { ...item, label: value };
						handleChangeAttributes({ options: data.options.toSpliced(index, 1, newOption) });
					}

					return (
						<Box paddingBlockEnd="200">
							<Card padding="200">
								<InlineStack gap="300">
									<Button icon={DragHandleIcon} variant="monochromePlain" />
									<TextField value={item.label} onChange={changeLabel} />
								</InlineStack>
							</Card>
						</Box>
					);
				}}
			>
				<Card padding="200">
					<Button icon={PlusCircleIcon} fullWidth variant="plain" onClick={handleAddOption}>
						Add new option
					</Button>
				</Card>
			</DragDrop>
		</FormLayout>
	);
}

SelectForm.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		type: PropTypes.string,
		required: PropTypes.bool,
		label: PropTypes.string,
		helpText: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
		options: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string
			})
		),
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
		options: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string
			})
		),
		visible: PropTypes.string,
		default: PropTypes.string
	})
};
