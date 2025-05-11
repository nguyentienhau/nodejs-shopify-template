import PropTypes from "prop-types";
import { useState } from "react";
import {
	TextField,
	Popover,
	Card,
	ColorPicker as ShopifyColorPicker,
	hexToRgb,
	rgbToHsb,
	hsbToHex
} from "@shopify/polaris";

export function ColorPicker({ label = "", color = "#000000", onChange = () => {}, error = "" }) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	return (
		<TextField
			label={label}
			prefix="#"
			maxLength="6"
			value={color.replace("#", "")}
			onChange={(value) => onChange("#" + value.replace(/[^0-9a-fA-F]/g, ""))}
			error={error}
			suffix={
				<Popover
					active={popoverOpen}
					preferredPosition="above"
					preferredAlignment="right"
					onClose={() => setPopoverOpen(false)}
					activator={
						<button
							style={{ backgroundColor: color }}
							className="Polaris-ColorPickerActivator"
							onClick={() => setPopoverOpen(!popoverOpen)}
						/>
					}
				>
					<Card>
						<ShopifyColorPicker
							color={rgbToHsb(hexToRgb(color))}
							onChange={(value) => onChange(hsbToHex(value))}
						/>
					</Card>
				</Popover>
			}
		/>
	);
}

ColorPicker.propTypes = {
	label: PropTypes.string,
	color: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string
};
