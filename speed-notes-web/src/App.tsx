import React from "react";
import { Document } from "./containers/Document/Document";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/document/:id">
					<Document />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
