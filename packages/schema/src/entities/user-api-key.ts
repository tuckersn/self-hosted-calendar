import { ReadonlyDeep } from "type-fest";
import { UserRecord } from "./user";

import { RestEndpoint } from "./wrappers/rest-endpoint";


export interface UserApiKeyRecord {
	id: number;
	userId: number;
	created: Date;
	expiration: Date;
	keyName: string;
	keyHash: string;
	description: string;
	active: boolean;
}


export type UserApiKeyRecordInsertRequiredFields = Pick<UserApiKeyRecord, 'userId' | 'keyHash' | 'keyName'>;
export type UserApiKeyRecordInsertOptionalFields = Pick<UserApiKeyRecord, 'active' | 'description' | 'expiration'>;
export type UserApiKeyRecordInsertFields = UserApiKeyRecordInsertRequiredFields & Partial<UserApiKeyRecordInsertOptionalFields>;

export interface UserApiKeyQueryFunctions {
	// Standard queries
	getById: (id: number) => Promise<UserApiKeyRecord | null>;
	getByUserId: (userId: number) => Promise<UserApiKeyRecord[]>;
	getByKeyName: (keyName: string) => Promise<UserApiKeyRecord | null>;

	insert: (UserApiKeyRecord: UserApiKeyRecordInsertFields) => Promise<UserApiKeyRecord>;
	delete: (id: number) => Promise<void>;
	updateById: (id: number, UserApiKeyRecord: Partial<UserApiKeyRecord>) => Promise<UserApiKeyRecord>;
}

