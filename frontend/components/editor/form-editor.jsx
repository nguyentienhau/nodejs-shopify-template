import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { InlineStack, Button, Box, Text, Card, Select } from "@shopify/polaris";
import { PlusCircleIcon, EditIcon, DeleteIcon, DragHandleIcon, ViewIcon, HideIcon } from "@shopify/polaris-icons";
import { DragDrop, Modal } from "@frontend/components/resource";
import { InputForm, TextareaForm, HeadingForm, DividerForm, SelectForm } from "@frontend/components/form";
import { AgHelpers } from "@frontend/helpers";
import { FormFieldSamples } from "@frontend/constants";

export function FormEditor({ data = [], onChange = () => {} }) {
	const [selectedField, setSelectedField] = useState({});
	const [fieldErrors, setFieldErrors] = useState({});

	function handleAddField() {
		const uniqueId = new Date().getTime().toString();
		const newField = { ...FormFieldSamples.text, id: uniqueId };
		setSelectedField(newField);
	}

	function handleEditField(id) {
		const index = data.findIndex((item) => item.id === id);

		if (index >= 0) {
			const sample = FormFieldSamples[data[index].type];
			setSelectedField({ ...sample, ...data[index] });
			setFieldErrors({});
		}
	}

	function handleDeleteField(id) {
		const newValue = data.filter((item) => item.id !== id);
		onChange(newValue);
	}

	function handleChangeType(type) {
		const sample = FormFieldSamples[type];
		setSelectedField({ ...sample, ...selectedField, type });
	}

	function handleChangeField(field) {
		const index = data.findIndex((item) => item.id === field.id);

		if (index >= 0) {
			onChange(data.toSpliced(index, 1, { ...data[index], ...field }));
		}
	}

	function handleSaveField(field) {
		const fieldData = AgHelpers.getFormFieldData(field);

		if (AgHelpers.validateFormField(fieldData)) {
			const index = data.findIndex((item) => item.id === field.id);

			if (index >= 0) {
				onChange(data.toSpliced(index, 1, fieldData));
			} else {
				onChange(data.concat(fieldData));
			}

			setSelectedField({});
		} else {
			const errors = AgHelpers.getFormFieldErrors(fieldData);
			setFieldErrors(errors);
		}
	}

	const FieldForm = useMemo(
		function () {
			switch (selectedField.type) {
				case "textarea": {
					return TextareaForm;
				}
				case "heading": {
					return HeadingForm;
				}
				case "divider": {
					return DividerForm;
				}
				case "select":
				case "radios": {
					return SelectForm;
				}
				default: {
					return InputForm;
				}
			}
		},
		[selectedField]
	);

	return (
		<DragDrop
			items={data}
			onChange={onChange}
			renderItem={function (item) {
				return (
					<Box paddingBlockEnd="200">
						<Card padding="300">
							<InlineStack align="space-between" blockAlign="center" wrap={false}>
								<InlineStack gap="100" wrap={false}>
									<Button icon={DragHandleIcon} variant="monochromePlain" />
									<div style={{ display: "flex", gap: "2px" }}>
										<Text as="span" truncate={true}>
											{item.label}
										</Text>
										<span style={{ color: item.required ? "red" : "transparent" }}>*</span>
									</div>
								</InlineStack>
								<InlineStack gap="200" wrap={false}>
									<Button
										icon={EditIcon}
										variant="monochromePlain"
										onClick={() => handleEditField(item.id)}
									/>
									<Button
										icon={item.visible ? ViewIcon : HideIcon}
										variant="monochromePlain"
										onClick={() => handleChangeField({ id: item.id, visible: !item.visible })}
									/>
									<Button
										icon={DeleteIcon}
										disabled={item.default}
										variant="monochromePlain"
										onClick={() => handleDeleteField(item.id)}
									/>
								</InlineStack>
							</InlineStack>
						</Card>
					</Box>
				);
			}}
		>
			<Card padding="150">
				<Button fullWidth variant="plain" icon={PlusCircleIcon} textAlign="center" onClick={handleAddField}>
					Add new field
				</Button>
			</Card>
			<Modal
				open={selectedField.id}
				title="Edit field"
				onClose={() => setSelectedField({})}
				primaryAction={{ content: "Save", onAction: () => handleSaveField(selectedField) }}
				secondaryActions={[{ content: "Cancel", onAction: () => setSelectedField({}) }]}
			>
				<Box paddingInline="400" paddingBlockStart="300" paddingBlockEnd="400">
					<Box paddingBlockEnd="400">
						<Select
							label="Type"
							options={[
								{ label: "Text", value: "text" },
								{ label: "Number", value: "number" },
								{ label: "Email", value: "email" },
								{ label: "Password", value: "password" },
								{ label: "Checkbox", value: "checkbox" },
								{ label: "Heading", value: "heading" },
								{ label: "Divider", value: "divider" },
								{ label: "Textarea", value: "textarea" },
								{ label: "Select", value: "select" },
								{ label: "Radios", value: "radios" }
							]}
							value={selectedField.type}
							onChange={handleChangeType}
						/>
					</Box>
					<FieldForm data={selectedField} onChange={setSelectedField} errors={fieldErrors} />
				</Box>
			</Modal>
		</DragDrop>
	);
}

FormEditor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func
};
