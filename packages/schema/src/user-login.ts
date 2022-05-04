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

export interface UserLoginQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<UserLoginRecord | null>;
	getByIp: (ip: string) => Promise<UserLoginRecord[]>;
	getByUserId: (userId: number) => Promise<UserLoginRecord[]>;
	insert: (UserLoginRecord: UserLoginRecordInsertRequiredFields) => Promise<UserLoginRecord>;
	delete: (id: number) => Promise<void>;

	// Specialized Queries
	getByUsername: (username: string) => Promise<UserLoginRecord | null>;
	getByEmail: (email: string) => Promise<UserLoginRecord | null>;
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
