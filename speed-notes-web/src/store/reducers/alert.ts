import { createSlice } from "@reduxjs/toolkit";

export interface IAlerts {
	isVisible: boolean;
	title: string;
	message: string;
	severity: "success" | "info" | "warning" | "error";
	variant?: "filled" | "outlined" | "standard";
	autoCloseTimeInSeconds?: number;
}

const initialAlertState: IAlerts = {
	isVisible: false,
	title: "",
	message: "",
	severity: "success",
	variant: "standard",
	autoCloseTimeInSeconds: 3,
};
const alertSlice = createSlice({
	name: "Alerts",
	initialState: initialAlertState,

	reducers: {
		showModal: (state, payload) => {
			const { message, title, severity, autoClose, autoCloseTimeInSeconds } =
				payload.payload;

			console.log(autoCloseTimeInSeconds);

			state.message = message;
			state.title = title;
			state.severity = severity ? severity : "success";
			state.isVisible = true;
			state.autoCloseTimeInSeconds = autoClose
				? autoCloseTimeInSeconds * 1000
				: 4000;
		},
		hideAlert: (state) => {
			state.isVisible = false;
		},
	},
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
