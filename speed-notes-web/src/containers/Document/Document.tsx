import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

let socket: any = null;

const Document = () => {
	const { id: documentId } = useParams<{ id: string }>();
	const [documentText, setDocumentText] = useState<string>(
		"Hi! We are loading..."
	);

	useEffect(() => {
		socket = io("ws://localhost:3001");

		socket.emit("get-document-content", documentId);

		socket.on("get-document-content", (messagesFromServer: string) =>
			setDocumentText(messagesFromServer)
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateText = React.useCallback((value: string) => {
		socket.emit("send-document-content", {
			documentContent: value,
			documentId: documentId,
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<CodeMirror
				height="100vh"
				extensions={[javascript({ jsx: true })]}
				onChange={updateText}
				theme="dark"
				lang="javascript"
				value={documentText}
			/>
		</>
	);
};

export { Document };
