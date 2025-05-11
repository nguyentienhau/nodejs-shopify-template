import PropTypes from "prop-types";

export function Switch({ enable = false, onChange = () => {} }) {
	return (
		<label className="Polaris-Switch">
			<input type="checkbox" checked={enable} onChange={onChange} />
		</label>
	);
}

Switch.propTypes = {
	enable: PropTypes.bool,
	onChange: PropTypes.func
};
