import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

interface IEditorProps {
	onChange: (value: string) => void;
	documentText: string;
}

export const Editor: React.FC<IEditorProps> = ({ onChange, documentText }) => {
	return (
		<CodeMirror
			height="90vh"
			extensions={[javascript({ jsx: true })]}
			onChange={onChange}
			theme="dark"
			lang="typescript"
			value={documentText}
		/>
	);
};

export default Editor;
