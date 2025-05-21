import PropTypes from "prop-types";
import { ChoiceList } from "@shopify/polaris";
import { VariantPicker, CollectionPicker, TagPicker } from "@frontend/components/picker";

export function ProductCondition({ data = {}, resource = {}, onChange = () => {} }) {
	function handleChangeAttributes(value) {
		onChange({ ...data, ...value });
	}

	return (
		<ChoiceList
			choices={[
				{
					label: "All products",
					value: 0
				},
				{
					label: "Specific variants",
					value: 1,
					renderChildren: function (selected) {
						return selected ? (
							<VariantPicker
								data={data.variantIds}
								resource={resource.variants}
								onChange={(value) => handleChangeAttributes({ variantIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Product collections",
					value: 2,
					renderChildren: function (selected) {
						return selected ? (
							<CollectionPicker
								data={data.collectionIds}
								resource={resource.collections}
								onChange={(value) => handleChangeAttributes({ collectionIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Product tags",
					value: 3,
					renderChildren: function (selected) {
						return selected ? (
							<TagPicker
								data={data.productTags}
								resource={resource.tags}
								onChange={(value) => handleChangeAttributes({ productTags: value })}
							/>
						) : null;
					}
				}
			]}
			selected={[data.productOption]}
			onChange={(value) => handleChangeAttributes({ productOption: value[0] })}
		/>
	);
}

ProductCondition.propTypes = {
	data: PropTypes.shape({
		productOption: PropTypes.number,
		variantIds: PropTypes.arrayOf(PropTypes.string),
		collectionIds: PropTypes.arrayOf(PropTypes.string),
		productTags: PropTypes.arrayOf(PropTypes.string)
	}),
	resource: PropTypes.shape({
		variants: PropTypes.arrayOf(PropTypes.object),
		collections: PropTypes.arrayOf(PropTypes.object),
		tags: PropTypes.arrayOf(PropTypes.string)
	}),
	onChange: PropTypes.func
};
