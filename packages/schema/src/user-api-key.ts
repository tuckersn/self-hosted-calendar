import { ReadonlyDeep } from "type-fest";
import { UserRecord } from "./user";

import { RestEndpoint } from "./wrappers/rest-endpoint";


export interface UserApiKeyRecord {
	id: number;
	userId: number;
	created: Date;
	expiration: Date;
	keyName: string;
	active: boolean;
	apiKey: string;
}


export type UserApiKeyRecordInsertRequiredFields = Pick<UserApiKeyRecord, 'userId' | 'apiKey'>;
export type UserApiKeyRecordInsertOptionalFields = Pick<UserApiKeyRecord, 'active' | 'keyName' | 'expiration'>;
export type UserApiKeyRecordInsertFields = UserApiKeyRecordInsertOptionalFields & Partial<UserApiKeyRecordInsertRequiredFields>;

export interface UserApiKeyQueryFunctions {
	// Standard queries
	getById: (id: number) => Promise<UserApiKeyRecord | null>;
	getByUserId: (userId: number) => Promise<UserApiKeyRecord[]>;
	getByApiKey: (apiKey: string) => Promise<UserApiKeyRecord | null>;

	insert: (UserApiKeyRecord: UserApiKeyRecordInsertFields) => Promise<UserApiKeyRecord>;
	delete: (id: number) => Promise<void>;
	updateById: (id: number, UserApiKeyRecord: Partial<UserApiKeyRecord>) => Promise<UserApiKeyRecord>;
}

