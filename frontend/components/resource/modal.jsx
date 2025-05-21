import PropTypes from "prop-types";
import { Modal as ShopifyModal, TitleBar } from "@shopify/app-bridge-react";

export function Modal({
	open = false,
	title = "",
	onClose = () => {},
	primaryAction = {},
	secondaryActions = [],
	children = ""
}) {
	return (
		<ShopifyModal id="modal" open={open} onHide={onClose}>
			<TitleBar title={title}>
				{primaryAction.content ? (
					<button
						variant="primary" // eslint-disable-line react/no-unknown-property
						disabled={primaryAction.disabled || false}
						loading={primaryAction.loading ? "" : undefined}
						onClick={primaryAction.onAction || (() => {})}
					>
						{primaryAction.content}
					</button>
				) : null}
				{secondaryActions.map(function (secondaryAction) {
					return secondaryAction.content ? (
						<button
							disabled={secondaryAction.disabled || false}
							loading={secondaryAction.loading ? "" : undefined}
							onClick={secondaryAction.onAction || (() => {})}
						>
							{secondaryAction.content}
						</button>
					) : null;
				})}
			</TitleBar>
			{children}
		</ShopifyModal>
	);
}

Modal.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	onClose: PropTypes.func,
	primaryAction: PropTypes.shape({
		content: PropTypes.string,
		disabled: PropTypes.bool,
		loading: PropTypes.bool,
		onAction: PropTypes.func
	}),
	secondaryActions: PropTypes.arrayOf(
		PropTypes.shape({
			content: PropTypes.string,
			disabled: PropTypes.bool,
			loading: PropTypes.bool,
			onAction: PropTypes.func
		})
	),
	children: PropTypes.node
};
