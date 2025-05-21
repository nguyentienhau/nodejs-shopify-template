import PropTypes from "prop-types";
import { ChoiceList } from "@shopify/polaris";
import { CustomerPicker, TagPicker } from "@frontend/components/picker";

export function CustomerCondition({ data = {}, resource = {}, onChange = () => {} }) {
	function handleChangeAttributes(value) {
		onChange({ ...data, ...value });
	}

	return (
		<ChoiceList
			choices={[
				{
					label: "All customers",
					value: 0
				},
				{
					label: "Logged-in customers",
					value: 1
				},
				{
					label: "Specific customers",
					value: 2,
					renderChildren: function (selected) {
						return selected ? (
							<CustomerPicker
								data={data.customerIds}
								resource={resource.customers}
								onChange={(value) => handleChangeAttributes({ customerIds: value })}
							/>
						) : null;
					}
				},
				{
					label: "Customer tags",
					value: 3,
					renderChildren: function (selected) {
						return selected ? (
							<TagPicker
								data={data.customerTags}
								resource={resource.tags}
								onChange={(value) => handleChangeAttributes({ customerTags: value })}
							/>
						) : null;
					}
				}
			]}
			selected={[data.customerOption]}
			onChange={(value) => handleChangeAttributes({ customerOption: value[0] })}
		/>
	);
}

CustomerCondition.propTypes = {
	data: PropTypes.shape({
		customerOption: PropTypes.number,
		customerIds: PropTypes.arrayOf(PropTypes.string),
		customerTags: PropTypes.arrayOf(PropTypes.string)
	}),
	resource: PropTypes.shape({
		customers: PropTypes.arrayOf(PropTypes.object),
		tags: PropTypes.arrayOf(PropTypes.string)
	}),
	onChange: PropTypes.func
};
