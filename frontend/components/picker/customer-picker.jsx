import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { BlockStack, Card, InlineStack, Text, Button, Avatar, TextField, Icon } from "@shopify/polaris";
import { SearchIcon, XIcon } from "@shopify/polaris-icons";

export function CustomerPicker({ data = [], resource = [], onChange = () => {} }) {
	const shopify = useAppBridge();
	const [selectedItems, setSelectedItems] = useState([]);
	const [searchText, setSearchText] = useState("");

	async function handleOpenModal() {
		const picker = await shopify.picker({
			heading: "Select customers",
			items: resource
		});

		if (picker.selected) {
			onChange(picker.selected);
		}
	}

	function handleChangeSearchText(value) {
		if (selectedItems.length === 0) {
			handleOpenModal();
		} else {
			setSearchText(value);
		}
	}

	function handleRemoveId(id) {
		onChange(data.filter((item) => item !== id));
	}

	useEffect(
		function () {
			const resourceMap = new Map(resource.map((item) => [item.id, item]));
			const newValue = data.map((item) => resourceMap.get(item));
			setSelectedItems(newValue);
		},
		[data, resource]
	);

	const searchedItems = useMemo(
		function () {
			const text = searchText.trim().toLowerCase();
			return selectedItems.filter(function (item) {
				return item.name.toLowerCase().includes(text) || item.email.toLowerCase().includes(text);
			});
		},
		[searchText, selectedItems]
	);

	return (
		<BlockStack gap="200">
			<InlineStack gap="200">
				<TextField
					placeholder="Search customers"
					prefix={<Icon source={SearchIcon} />}
					value={searchText}
					onChange={handleChangeSearchText}
				/>
				<Button size="large" onClick={handleOpenModal}>
					Browse
				</Button>
			</InlineStack>
			{searchedItems.map(function (item) {
				return (
					<Card padding="300" key={item.id}>
						<InlineStack align="space-between" blockAlign="center">
							<InlineStack gap="200">
								<Avatar source={item.imageUrl} />
								<Text truncate={true}>{item.title}</Text>
							</InlineStack>
							<Button icon={XIcon} variant="monochromePlain" onClick={() => handleRemoveId(item.id)} />
						</InlineStack>
					</Card>
				);
			})}
		</BlockStack>
	);
}

CustomerPicker.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string),
	resource: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func
};
