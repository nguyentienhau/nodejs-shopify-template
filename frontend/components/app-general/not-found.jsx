import { Card, EmptyState, Page } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { NotFoundImage } from "@frontend/images";

export function NotFound() {
	const { t } = useTranslation();
	return (
		<Page>
			<Card>
				<EmptyState heading={t("NotFound.heading")} image={NotFoundImage}>
					<p>{t("NotFound.description")}</p>
				</EmptyState>
			</Card>
		</Page>
	);
}
