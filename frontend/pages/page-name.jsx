import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function PageName() {
	const { t } = useTranslation();
	return (
		<Page>
			<TitleBar title={t("PageName.title")}>
				{/* eslint-disable-next-line react/no-unknown-property */}
				<button variant="primary" onClick={() => {}}>
					{t("PageName.primaryAction")}
				</button>
				<button onClick={() => {}}>{t("PageName.secondaryAction")}</button>
			</TitleBar>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<Text variant="headingMd" as="h2">
							{t("PageName.heading")}
						</Text>
						<TextContainer>
							<p>{t("PageName.body")}</p>
						</TextContainer>
					</Card>
					<Card sectioned>
						<Text variant="headingMd" as="h2">
							{t("PageName.heading")}
						</Text>
						<TextContainer>
							<p>{t("PageName.body")}</p>
						</TextContainer>
					</Card>
				</Layout.Section>
				<Layout.Section secondary>
					<Card sectioned>
						<Text variant="headingMd" as="h2">
							{t("PageName.heading")}
						</Text>
						<TextContainer>
							<p>{t("PageName.body")}</p>
						</TextContainer>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
