import { DocumentNode } from "graphql";

import { RestEndpoint } from "../wrappers/rest-endpoint";
import { ReadonlyDeep } from 'type-fest';
import { IError } from "../wrappers/error";

export enum UserType {
	/**
	 * Default user type.
	 */
	USER = 0,
	/**
	 * Users who can use elevated privileges.
	 * 
	 * ***WARNING: Can impersonate other users.***
	 */
	ADMIN = 1,
	/**
	 * Service accounts.
	 */
	SERVICE = 2,
	/**
	 * Service accounts with elevated privileges.
	 * 
	 * ***WARNING: Can impersonate other users.***
	 */
	ADMIN_SERVICE = 3,
	/**
	 * Admin service accounts that are read-only.
	 * @unimplemented
	 */
	READ_ONLY_ADMIN_SERVICE = 4
}

export function userTypeToString(userType: UserType): string {
	switch (userType) {
		case UserType.USER:
			return "USER";
		case UserType.ADMIN:
			return "ADMIN";
		case UserType.SERVICE:
			return "SERVICE";
		case UserType.ADMIN_SERVICE:
			return "ADMIN_SERVICE";
		case UserType.READ_ONLY_ADMIN_SERVICE:
			return "READ_ONLY_ADMIN_SERVICE";
		default:
			throw new Error("Invalid user type");
	}
}

export function userTypeFromString(userType: string): UserType {
	switch (userType) {
		case "USER":
			return UserType.USER;
		case "ADMIN":
			return UserType.ADMIN;
		case "SERVICE":
			return UserType.SERVICE;
		case "ADMIN_SERVICE":
			return UserType.ADMIN_SERVICE;
		case "READ_ONLY_ADMIN_SERVICE":
			return UserType.READ_ONLY_ADMIN_SERVICE;
		default:
			throw new Error("Invalid user type");
	}
}

export interface UserRecord {
	id: number;
	/**
	 * Unique string id of this user.
	 */
	uuid: string;
	/**
	 * Unique name of this user.
	 */
	username: string;
	/**
	 * Unique to each user.
	 */
	 email: string;

	userType: UserType;
	/**
	 * What to call the user, this
	 * is not unique and defaults to the username.
	 */
	displayName: string | null;
	/**
	 * bcrypt hash
	 */
	passwordHash: string | null;
	/**
	 * If this is false the user has been disabled.
	 */
	enabled: boolean;

	created: Date;
}

/**
 * Version of {@link UserRecord} that the client will be exposed to.
 * 
 * ***Example:*** passwordHash should not be sent to any client ever.
 */
export type ClientUserRecord = Pick<UserRecord, 'username' | 'displayName' | 'email' | 'created'>;

export type UserRecordInsertRequiredFields = Pick<UserRecord, 'username' | 'email' | 'userType'>;
export type UserRecordInsertOptionalFields = Pick<UserRecord, 'displayName' | 'passwordHash'>;
export type UserRecordInsertFields = UserRecordInsertOptionalFields & Partial<UserRecordInsertRequiredFields>;

export const DEFAULT_USER_RECORD_FIELDS: UserRecordInsertOptionalFields = {
	displayName: null,
	passwordHash: null
}


export module UserErrors {
	/**
	 * Unique value for user errors, helps
	 * with catch statements.
	 */
	export const KEY = "USER_ERROR";

	export type UsernameTakenError = IError<typeof KEY, 'USERNAME_TAKEN', 'Username is taken.'>;
	export function UsernameTakenError(): UsernameTakenError {
		return IError(KEY, 'USERNAME_TAKEN', 'Username is taken.');
	}
	export type EmailTakenError = IError<typeof KEY, 'EMAIL_TAKEN', 'Email is taken.'>;
	export function EmailTakenError(): EmailTakenError {
		return IError(KEY, 'EMAIL_TAKEN', 'Email is taken.');
	}

	export type All = UsernameTakenError | EmailTakenError;
}



export interface UserQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<UserRecord | null>;
	getByUsername: (username: string) => Promise<UserRecord | null>;
	getByUUID: (uuid: string) => Promise<UserRecord | null>;
	getByEmail: (email: string) => Promise<UserRecord | null>;

	insert: (userRecord: UserRecordInsertFields) => Promise<UserRecord>;
	updateById: (id: number, userRecord: Partial<UserRecord>) => Promise<UserRecord>;
	delete: (id: number) => Promise<void>;

	// Queries for specific uses

	/**
	 * For use for in dashboards.
	 */
	getOverview: () => Promise<{
		accountCount: number;
		activeCount: number;
		adminCount: number;
		serviceCount: number;
	}>;
}



// export const UserGQL: DocumentNode = gql`
// `;



export module UserRestApi {
	/**
	 * [GET] /users/:uuid_or_username
	 */
	export type GetUser = RestEndpoint<{}, undefined, ClientUserRecord>;

	/**
	 * [POST] /users
	 */
	export type CreateUser = RestEndpoint<{}, Pick<UserRecordInsertFields, 'username' | 'email' | 'displayName'>, ClientUserRecord>;

	 /**
	 * [POST] /users/:id
	 */
	export type UpdateUser = RestEndpoint<{}, Pick<UserRecordInsertFields, 'displayName'>, ClientUserRecord>;

	/**
	 * [POST] /users/:id/password
	 */
	export type ChangeUserPassword = RestEndpoint<{}, {
		password: string;
	}, ClientUserRecord>;

	/**
	 * [POST] /users/:id/email
	 */
	export type ChangeUserEmail = RestEndpoint<{}, {
		password: string;
	}, ClientUserRecord>;

	/**
	 * [GET] /users/overview
	 */
	export type GetUserOverview = RestEndpoint<{}, undefined, {
		accountCount: number;
		activeCount: number;
		adminCount: number;
		serviceCount: number;
	}>;
}
