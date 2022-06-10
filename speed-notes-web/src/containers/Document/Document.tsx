import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import DocumentBackground from "../../components/DocumentBackground/DocumentBackground";
import CodeEditor from "@uiw/react-textarea-code-editor";

let socket: any = null;

const Document = () => {
	const [documentText, setDocumentText] = useState<string>(
		"Hi! We are loading..."
	);

	const { id: documentId } = useParams<{ id: string }>();

	useEffect(() => {
		socket = io("ws://localhost:3001");

		socket.emit("get-document-content", documentId);

		socket.on("get-document-content", (messagesFromServer: string) =>
			setDocumentText(messagesFromServer)
		);
	}, []);

	const updateText = (userInput: string) =>
		socket.emit("send-document-content", {
			documentContent: userInput,
			documentId: documentId,
		});

	return (
		<>
			<DocumentBackground />
			<CodeEditor
				value={documentText}
				language="tsx"
				padding={15}
				onChange={(e) => updateText(e.target.value)}
				style={styles.documentWriteableArea}
			/>
		</>
	);
};

const styles = {
	documentWriteableArea: {
		width: "100%",
		height: "100vh",
		position: "fixed" as "fixed",
		overflow: "auto",
		fontSize: "1.1rem",
		backgroundColor: "#17161ab3",
		color: "white",
	},
};

export { Document };
