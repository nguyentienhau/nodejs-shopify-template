import PropTypes from "prop-types";
import styles from "@/styles/resource/switch.module.css";

export function Switch({ enable = false, onChange = () => {} }) {
	return (
		<label className={styles.switch}>
			<input type="checkbox" checked={enable} onChange={onChange} />
		</label>
	);
}

Switch.propTypes = {
	enable: PropTypes.bool,
	onChange: PropTypes.func
};
