import { ReadonlyDeep } from "type-fest";
import { QueryContext } from "./wrappers/database";
import { RestEndpoint } from "./wrappers/rest-endpoint";

export enum UserLoginMethod {
	UNKNOWN = 0,
	PASSWORD = 1
}

export function userLoginMethodToString(method: UserLoginMethod): string {
	switch (method) {
		case UserLoginMethod.UNKNOWN:
			return "Unknown";
		case UserLoginMethod.PASSWORD:
			return "Password";
		default:
			throw new Error("Invalid UserLoginMethod");
	}
}

export function userLoginMethodFromString(method: string): UserLoginMethod {
	switch (method) {
		case "Unknown":
			return UserLoginMethod.UNKNOWN;
		case "Password":
			return UserLoginMethod.PASSWORD;
		default:
			throw new Error("Invalid UserLoginMethod");
	}
}

export interface UserLoginRecord {
	id: number;
	userId: number;
	loginDate: Date;
	ip: string;
	userAgent: string | null;
	method: UserLoginMethod;
}


export type UserLoginRecordInsertRequiredFields = Pick<UserLoginRecord, 'userId' | 'ip'>;
export type UserLoginRecordInsertOptionalFields = Pick<UserLoginRecord, 'userAgent' | 'method'>;
export type UserLoginRecordInsertFields = UserLoginRecordInsertOptionalFields & Partial<UserLoginRecordInsertRequiredFields>;

export const DEFAULT_USER_LOGIN_RECORD_FIELDS: UserLoginRecordInsertOptionalFields = {
	userAgent: null,
	method: UserLoginMethod.UNKNOWN
}

export interface UserLoginQueryFunctions {
	// Standard Queries
	getById: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<UserLoginRecord | null>;
	getByIp: (context: ReadonlyDeep<QueryContext>, ip: string) => Promise<UserLoginRecord[]>;
	getByUserId: (context: ReadonlyDeep<QueryContext>, userId: number) => Promise<UserLoginRecord[]>;
	insert: (context: ReadonlyDeep<QueryContext>, UserLoginRecord: UserLoginRecordInsertRequiredFields) => Promise<UserLoginRecord>;
	delete: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<void>;

	// Specialized Queries
	getByUsername: (context: ReadonlyDeep<QueryContext>, username: string) => Promise<UserLoginRecord | null>;
	getByEmail: (context: ReadonlyDeep<QueryContext>, email: string) => Promise<UserLoginRecord | null>;
}

export module LoginREST {
	/**
	 * [POST] /login/password
	 */
	export type PasswordAuthentication = RestEndpoint<{}, {
		password: string;
	}, {
		state: 'success' | 'failure';
		token: string | null;
		errorMsg: string | null;
	}>;

}
