import React from "react";
import { Editor } from "../../components";

export const Main = () => {
	const [documentText, setDocumentText] = React.useState<string>(
		"Welcome to Speed Notes"
	);

	return (
		<>
			<Editor onChange={() => console.log("123")} documentText={documentText} />
		</>
	);
};
