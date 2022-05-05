import { UserType } from "../user";

export interface QueryContext {
	userId: number;
	userUUID: string;
	userType: UserType;
}