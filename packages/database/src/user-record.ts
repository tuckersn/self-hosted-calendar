export interface UserRecord {
	id: number;
	username: string;
	name: string | null;
	email: string;
	passwordHash: string | null;
	created: Date;
}


export interface UserRecordInsertRequiredFields {
	username: string;
	email: string;
	passwordHash: string;
}

export const DEFAULT_USER_RECORD_FIELDS: Pick<UserRecord, 'username' | 'name'> = {
	name: "User",
	username: "username"
}