import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./Document.css";
import DocumentBackground from "../../components/DocumentBackground/DocumentBackground";

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
		<div>
			<DocumentBackground />
			<textarea
				id="document-writeable-area"
				value={documentText}
				onChange={(e) => updateText(e.target.value)}
			/>
		</div>
	);
};

export { Document };
