import React from "react";
import { Document } from "./containers/Document/Document";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setupI18n, setupTheme } from "./general-setup";
import { ThemeProvider } from "@mui/material/styles";
import Auth from "./containers/Document/Auth/Auth";

function App() {
	setupI18n();
	const theme = setupTheme();

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="">
						<Auth />
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
