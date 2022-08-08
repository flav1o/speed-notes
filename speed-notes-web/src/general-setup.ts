import { createTheme } from "@mui/material";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AUTH_LOCAL_STORAGE_TOKEN, LANGUAGES } from "./constants";
import translationEN from "./i18n/en.json";
import { ThemeColors } from "./styles/common";
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	ApolloLink,
} from "@apollo/client";
import { ENV } from "./config/environment";

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

const httpLink = new HttpLink({ uri: ENV.REACT_APP_GRAPHQL_ENDPOINT });

const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);

	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	});

	return forward(operation);
});

export const client = new ApolloClient({
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "network-only",
		},
		query: {
			fetchPolicy: "network-only",
		},
	},
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		addTypename: false,
	}),
});
