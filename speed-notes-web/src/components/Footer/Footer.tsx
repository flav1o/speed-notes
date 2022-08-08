import React from "react";
import { useTranslation } from "react-i18next";
import { RiFileLockFill, RiSave2Fill } from "react-icons/ri";
import { Button, Box } from "@mui/material";

export const Footer = () => {
	const { t } = useTranslation();

	return (
		<Box width="50vw">
			<Button endIcon={<RiSave2Fill />}>{t("FOOTER.SAVE")}</Button>
			<Button endIcon={<RiFileLockFill />}>{t("FOOTER.LOCK")}</Button>
		</Box>
	);
};

// export const alertsStyle = makeStyles((theme: Theme) => ({}));
