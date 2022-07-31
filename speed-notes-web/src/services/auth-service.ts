import { AUTH_LOCAL_STORAGE_TOKEN } from "../constants";
import { ENDPOINTS_CONSTANTS } from "../constants/endpoints-constants";
import { HTTP_CLIENT } from "./index";

interface IAuthService {
	login: (email: string, password: string) => Promise<any>;
	register: (email: string, password: string) => Promise<any>;
	confirmAccount: (email: string, token: string) => Promise<any>;
	validateToken: () => Promise<any>;
}

export const AuthService: IAuthService = {
	login: async (email: string, password: string) => {
		return HTTP_CLIENT.post(ENDPOINTS_CONSTANTS.LOGIN, {
			email,
			password,
		});
	},
	register: async (email: string, password: string) => {
		return HTTP_CLIENT.post(ENDPOINTS_CONSTANTS.REGISTER, {
			email,
			password,
		});
	},
	confirmAccount: async (email: string, token: string) => {
		return HTTP_CLIENT.post(
			ENDPOINTS_CONSTANTS.CONFIRM_ACCOUNT,
			{},
			{
				params: {
					email,
					token,
				},
			}
		);
	},
	validateToken: async () => {
		const token = localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN);
		return HTTP_CLIENT.get(ENDPOINTS_CONSTANTS.VALIDATE_TOKEN, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};
