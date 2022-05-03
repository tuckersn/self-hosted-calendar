import { RestEndpoint } from "./wrappers/rest-endpoint";

export enum UserLoginMethod {
	UNKNOWN = 0,
	PASSWORD = 1
}

export function UserLoginMethodToString(method: UserLoginMethod): string {
	switch (method) {
		case UserLoginMethod.UNKNOWN:
			return "Unknown";
		case UserLoginMethod.PASSWORD:
			return "Password";
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

export module UserLoginQueryFunctions {
	// Standard Queries
	export type GetById = (id: number) => Promise<UserLoginRecord | null>;
	export type GetByIp = (ip: string) => Promise<UserLoginRecord[]>;
	export type GetByUserId = (userId: number) => Promise<UserLoginRecord[]>;
	export type Insert = (UserLoginRecord: UserLoginRecordInsertRequiredFields) => Promise<UserLoginRecord>;
	export type Update = (UserLoginRecord: UserLoginRecord) => Promise<UserLoginRecord>;
	export type Delete = (id: number) => Promise<void>;

	// Specialized Queries
	export type GetByUsername = (username: string) => Promise<UserLoginRecord | null>;
	export type GetByEmail = (email: string) => Promise<UserLoginRecord | null>;
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
