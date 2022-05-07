import gql from 'graphql-tag';
import { DocumentNode } from "graphql";

import { RestEndpoint } from "./wrappers/rest-endpoint";
import { ReadonlyDeep } from 'type-fest';


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
	uuid: string;
	username: string;
	displayName: string | null;
	email: string;
	passwordHash: string | null;
	created: Date;
}

/**
 * Version of {@link UserRecord} that the client will be exposed to.
 * 
 * ***Example:*** passwordHash should not be sent to any client ever.
 */
export type ClientUserRecord = Pick<UserRecord, 'username' | 'displayName' | 'email' | 'created'>;

export type UserRecordInsertRequiredFields = Pick<UserRecord, 'username' | 'email'>;
export type UserRecordInsertOptionalFields = Pick<UserRecord, 'displayName' | 'passwordHash'>;
export type UserRecordInsertFields = UserRecordInsertOptionalFields & Partial<UserRecordInsertRequiredFields>;

export const DEFAULT_USER_RECORD_FIELDS: UserRecordInsertOptionalFields = {
	displayName: null,
	passwordHash: null
}

export interface UserQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<UserRecord | null>;
	getByUsername: (username: string) => Promise<UserRecord | null>;
	getByEmail: (email: string) => Promise<UserRecord | null>;

	insert: (userRecord: UserRecordInsertFields) => Promise<UserRecord>;
	update: (userRecord: UserRecord) => Promise<UserRecord>;
	delete: (id: number) => Promise<void>;
}



export const UserGQL: DocumentNode = gql`
`;



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
}
