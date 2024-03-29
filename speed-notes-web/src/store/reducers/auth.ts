import { createSlice } from "@reduxjs/toolkit";
import { AUTH_LOCAL_STORAGE_TOKEN } from "../../constants";

interface IInitialState {
	isAuthenticated: boolean;
	accessToken: string | null;
	userEmail: string | null;
}

const initialAuthState: IInitialState = {
	isAuthenticated: false,
	accessToken: null,
	userEmail: null,
};

const authSlice = createSlice({
	name: "Auth",
	initialState: initialAuthState,
	reducers: {
		accessToken(state) {
			state.accessToken = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);
		},
		authenticate(state, action) {
			state.userEmail = action.payload;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
