import axios from "axios";

const HTTP_CLIENT = axios.create({
	baseURL: "http://localhost:3001/",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { HTTP_CLIENT };
