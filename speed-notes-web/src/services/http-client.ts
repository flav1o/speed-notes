import axios from "axios";
import { ENV } from "../config/environment";

const HTTP_CLIENT = axios.create({
	baseURL: ENV.REACT_APP_ENDPOINT,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export { HTTP_CLIENT };
