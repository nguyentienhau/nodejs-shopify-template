import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { BlockStack, Card, InlineStack, Text, Button, Avatar, TextField, Icon } from "@shopify/polaris";
import { SearchIcon, XIcon } from "@shopify/polaris-icons";
import { ProductIdPrefix } from "@frontend/constants";

function getSelectionIds(selected) {
	return selected.map((item) => ProductIdPrefix + item.id);
}

function getSelectedData(selected) {
	return selected.map((item) => Number(item.id.replace(ProductIdPrefix, "")));
}

export function ProductPicker({ data = [], resource = [], onChange = () => {} }) {
	const shopify = useAppBridge();
	const [selectedItems, setSelectedItems] = useState([]);
	const [searchText, setSearchText] = useState("");

	async function handleOpenModal() {
		const products = await shopify.resourcePicker({
			type: "product",
			multiple: true,
			action: "select",
			filter: { hidden: true, variants: false },
			selectionIds: getSelectionIds(selectedItems)
		});

		if (products) {
			const newData = getSelectedData(products);
			onChange(newData);
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
				return item.title.toLowerCase().includes(text);
			});
		},
		[searchText, selectedItems]
	);

	return (
		<BlockStack gap="200">
			<InlineStack gap="200">
				<TextField
					placeholder="Search products"
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

ProductPicker.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string),
	resource: PropTypes.arrayOf(PropTypes.object),
	onChange: PropTypes.func
};
