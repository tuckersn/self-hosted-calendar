import { UserType } from "./user";

export interface JWT {
	userId: number;
	profilePic: string;
	userType: UserType;
	iat: number;
	exp: number;
}