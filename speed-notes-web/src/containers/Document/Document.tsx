import React, { useEffect, useState } from "react";
import { Editor, Footer } from "../../components";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

let socket: any = null;

const Document = () => {
	const { id: documentId } = useParams<{ id: string }>();
	const [documentText, setDocumentText] = useState<string>(
		"Hi! We are loading..."
	);

	useEffect(() => {
		socket = io("http://localhost:8001");

		socket.on("updating-document-content", (content: string) => {
			setDocumentText(content);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateText = React.useCallback((documentText: string) => {
		socket.emit("send-document-content", {
			documentText,
			documentId,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Editor onChange={updateText} documentText={documentText} />
			<Footer />
		</>
	);
};

export { Document };
