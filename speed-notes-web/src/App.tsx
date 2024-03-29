import React, { useEffect } from "react";
import { Document } from "./containers/Document/Document";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setupI18n, setupTheme } from "./general-setup";
import { ThemeProvider } from "@mui/material/styles";
import Auth from "./containers/Auth/Auth";
import { useAppSelector } from "./store";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/auth";
import { AuthService } from "./services";
import { Main } from "./containers/Main";
import { Alert } from "./components";

function App() {
	setupI18n();
	const theme = setupTheme();

	const dispatch = useDispatch();
	dispatch(authActions.accessToken());

	const authState = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (authState.accessToken)
			AuthService.validateToken()
				.then((res) => {
					dispatch(authActions.authenticate(res?.data));
				})
				.catch(() => dispatch(authActions.logout()));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Alert />
				<Switch>
					<Route path="/" exact>
						{!authState.isAuthenticated ? <Auth /> : <Main />}
					</Route>
					<Route path="/auth">
						{!authState.isAuthenticated ? <Auth /> : <Main />}
					</Route>
					<Route path="/document/:id">
						<Document />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
