import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { BlockStack, InlineStack, Tag, Icon, Autocomplete } from "@shopify/polaris";
import { SearchIcon, PlusCircleIcon } from "@shopify/polaris-icons";

export function TagPicker({ data = [], resource = [], onChange = () => {} }) {
	const [searchText, setSearchText] = useState("");

	function handleAddTag(tag) {
		onChange(data.concat(tag));
		setSearchText("");
	}

	function handleRemoveTag(tag) {
		const newData = data.filter((item) => item !== tag);
		onChange(newData);
	}

	const [options, addTagDisabled] = useMemo(
		function () {
			const tagText = searchText.trim();
			const tags = Array.from(new Set(data.concat(resource)));
			const addTagDisabled = tagText === "" || tags.includes(tagText);
			const searchFunction = (tag) => tag.toLowerCase().includes(tagText.toLowerCase());
			const options = tags.filter(searchFunction).map((tag) => ({ label: tag, value: tag }));
			return [options, addTagDisabled];
		},
		[data, resource, searchText]
	);

	return (
		<BlockStack gap="200">
			<Autocomplete
				actionBefore={{
					content: <b>Add</b>,
					helpText: searchText,
					icon: PlusCircleIcon,
					badge: { tone: "new", content: "New!" },
					disabled: addTagDisabled,
					onAction: () => handleAddTag(searchText.trim())
				}}
				allowMultiple
				preferredPosition="above"
				listTitle="Suggested tags"
				options={options}
				selected={data}
				onSelect={onChange}
				textField={
					<Autocomplete.TextField
						placeholder="Search tags"
						prefix={<Icon source={SearchIcon} />}
						value={searchText}
						onChange={setSearchText}
					/>
				}
			/>
			<InlineStack blockAlign="center" gap="200">
				{data.map(function (tag) {
					return (
						<Tag onRemove={() => handleRemoveTag(tag)} key={tag}>
							{tag}
						</Tag>
					);
				})}
			</InlineStack>
		</BlockStack>
	);
}

TagPicker.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string),
	resource: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};
