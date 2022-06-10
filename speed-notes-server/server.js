const express = require("express");
const app = express();
const Server = app.listen(3001, () =>
	console.log("Server running on port 3001")
);

let documentContent = "";

const io = require("socket.io")(Server, {
	cors: {
		origin: "*",
	},
});

io.on("connect", (socket) => {
	socket.on("get-document-content", (documentId) => {
		socket.join(documentId);
	});

	socket.on("send-document-content", (args) => {
		documentContent = args.documentContent;
		io.to(args.documentId).emit("get-document-content", documentContent);
	});
});
