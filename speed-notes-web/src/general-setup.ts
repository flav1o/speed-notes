import { createTheme } from "@mui/material";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "./constants";
import translationEN from "./i18n/en.json";
import { ThemeColors } from "./styles/common";

export const setupI18n = () => {
	i18n.use(initReactI18next).init({
		resources: {
			EN: {
				translation: translationEN,
			},
		},
		lng: "EN",
		fallbackLng: LANGUAGES.EN,

		interpolation: {
			escapeValue: false,
		},
	});
};

export const setupTheme = () => {
	return createTheme({
		palette: {
			primary: {
				main: ThemeColors.primary,
			},
			secondary: {
				main: ThemeColors.secondary,
			},
		},
	});
};
