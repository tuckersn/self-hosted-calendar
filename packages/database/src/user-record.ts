export interface UserRecord {
	id: number;
	username: string;
	name: string | null;
	email: string;
	passwordHash: string | null;
	created: Date;
}


export type UserRecordInsertRequiredFields = Pick<UserRecord, 'username' | 'email'>;
export type UserRecordInsertOptionalFields = Pick<UserRecord, 'name' | 'passwordHash'>;
export type UserRecordInsertFields = UserRecordInsertOptionalFields & Partial<UserRecordInsertRequiredFields>;

export const DEFAULT_USER_RECORD_FIELDS: UserRecordInsertOptionalFields = {
	name: null,
	passwordHash: null
}

export module UserQueryFunctions {
	// Standard Queries
	export type GetById = (id: number) => Promise<UserRecord | null>;
	export type GetByUsername = (username: string) => Promise<UserRecord | null>;
	export type GetByEmail = (email: string) => Promise<UserRecord | null>;

	export type Insert = (userRecord: UserRecordInsertRequiredFields) => Promise<UserRecord>;
	export type Update = (userRecord: UserRecord) => Promise<UserRecord>;
	export type Delete = (id: number) => Promise<void>;
}