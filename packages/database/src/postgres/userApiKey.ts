import { Sequelize, QueryTypes } from "sequelize";
import { UserApiKeyQueryFunctions, UserApiKeyRecord, UserApiKeyRecordInsertFields } from "@internal/schema/dist";


export interface PostgresUserApiKeyRecord {
	id: number;
	key_hash: string;
	key_name: string;
	user_id: number;
	created: Date;
	expiration: Date;
	active: boolean;
	description: string;
}


export function userApiKeyQueryFunctions(connection: Sequelize): UserApiKeyQueryFunctions {

	const getById: UserApiKeyQueryFunctions['getById'] = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, user_id, created, expiration, key_name, active, key_hash, description
			FROM user_api_key
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresUserApiKeyRecord) | undefined;

		if(record === undefined)
			return null;

		return {
			id: record.id,
			keyHash: record.key_hash,
			keyName: record.key_name,
			userId: record.user_id,
			active: record.active,
			created: record.created,
			description: record.description,
			expiration: record.expiration
		}
	}

	return {
		getById,
		getByUserId: async (userId: number) => {
			const record = (await connection!.query(`
				SELECT id, user_id, created, expiration, key_name, active, key_hash, description
				FROM user_api_key
				WHERE user_id = :userId`, {
					replacements: {
						userId
					},
					type: QueryTypes.SELECT
			})) as PostgresUserApiKeyRecord[];

			return record.map((record) => {
				return {
					id: record.id,
					keyHash: record.key_hash,
					keyName: record.key_name,
					userId: record.user_id,
					active: record.active,
					created: record.created,
					description: record.description,
					expiration: record.expiration
				}
			});
		},
		insert: async (userApiKeyRecord: UserApiKeyRecordInsertFields) => {
			const result = (await connection!.query(`
				INSERT INTO user_api_key (user_id, expiration, key_name, active, key_hash, description)
				VALUES (:userId, :expiration, :keyName, :active, :keyHash, :description)
				RETURNING id`, {
					replacements: {
						userId: userApiKeyRecord.userId,
						expiration: userApiKeyRecord.expiration || null,
						keyName: userApiKeyRecord.keyName,
						active: userApiKeyRecord.active || false,
						keyHash: userApiKeyRecord.keyHash,
						description: userApiKeyRecord.description || null
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
			})) as any;

			console.log("result api key", result);

			return result;
		},
		delete: async (id: number) => {
			const result = (await connection!.query(`
				DELETE FROM user_api_key
				WHERE id = :id`, {
					replacements: {
						id
					},
					type: QueryTypes.DELETE
			}));
		},
		updateById: async (id: number, userApiKeyRecord: Partial<UserApiKeyRecord>) => {
			
			const databaseRecord = await getById(id);

			if(databaseRecord === null)
				throw new Error("UserApiKeyRecord not found");

			console.log("DB:", databaseRecord);

			const record = Object.assign({}, userApiKeyRecord, );
			const result = (await connection!.query(`
				UPDATE user_api_key
				SET user_id = :userId, expiration = :expiration, key_name = :keyName, active = :active, key_hash = :keyHash, description = :keyLastFiveChar
				WHERE id = :id
				RETURNING id`, {
					replacements: {
						id,
						userId: userApiKeyRecord.userId,
						expiration: userApiKeyRecord.expiration,
						keyName: userApiKeyRecord.keyName,
						active: userApiKeyRecord.active,
						keyHash: userApiKeyRecord.keyHash,
						keyLastFiveChar: userApiKeyRecord.description
					},
					type: QueryTypes.UPDATE
			})).pop() as any;

			return result;
		},
		getByKeyName: async (keyName: string) => {
			const record = (await connection!.query(`
				SELECT id, user_id, created, expiration, key_name, active, key_hash, description
				FROM user_api_key
				WHERE key_name = :keyName`, {
					replacements: {
						keyName
					},
					type: QueryTypes.SELECT
			})).pop() as (PostgresUserApiKeyRecord) | undefined;

			if(record === undefined)
				return null;

			return {
				id: record.id,
				keyHash: record.key_hash,
				keyName: record.key_name,
				userId: record.user_id,
				active: record.active,
				created: record.created,
				description: record.description,
				expiration: record.expiration
			}
		}	
	}
}
