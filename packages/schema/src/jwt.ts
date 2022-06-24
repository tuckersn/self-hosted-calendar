import { UserType } from "./entities/user";

export interface JWT {
	/** USER UUID */
	userId: string;
	username: string;
	displayName: string;
	profilePic: string;
	email: string;
	userType: UserType;
	iat: number;
	exp: number;
}

/**
 * Mainly used for client side info, but
 * can be used once the token is verified
 * on the backend.
 */
export function jwtDecode(jwtTokenStr: string): JWT {
	//TODO: verify correct JWT format
	return JSON.parse(atob(jwtTokenStr.split(".")[1]));
}