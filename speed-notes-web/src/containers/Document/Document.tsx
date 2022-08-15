import React, { useEffect, useState } from "react";
import { Editor } from "../../components";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { GENERAL_APP_SETUP } from "../../config/environment";

let socket: any = null;

const Document = () => {
	const { id: documentId } = useParams<{ id: string }>();
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	const [documentText, setDocumentText] = useState<string>(
		"Hi! We are loading..."
	);

	useEffect(() => {
		socket = io("http://localhost:8001");

		socket.emit("join-document", documentId);

		socket.on("updating-document-content", (data: string) => {
			data && setDocumentText(data);
		});

		socket.emit("send-document-content", { documentId, content: documentText });

		socket.on("exception", (error: { message: string; status: number }) => {
			alert(error.status);
			console.log("disconnect");
		});

		socket.on("disconnect", () => {
			console.log("disconnect");
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateText = (documentText: string) => {
		clearTimeout(timer);

		const bounce = setTimeout(() => {
			socket.emit("send-document-content", {
				documentText,
				documentId,
			});
		}, GENERAL_APP_SETUP.DOCUMENT_DEBOUNCE_TIME);

		setTimer(bounce);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	return (
		<>
			<Editor onChange={updateText} documentText={documentText} />
		</>
	);
};

export { Document };
