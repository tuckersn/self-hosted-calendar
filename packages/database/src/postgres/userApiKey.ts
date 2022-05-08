import { Sequelize, QueryTypes } from "sequelize";
import { UserApiKeyQueryFunctions, UserApiKeyRecord, UserApiKeyRecordInsertFields } from "@internal/schema/dist";

export function userApiKeyQueryFunctions(connection: Sequelize): UserApiKeyQueryFunctions {

	const getById: UserApiKeyQueryFunctions['getById'] = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, userId, created, expiration, keyName, active, apiKey
			FROM userApiKey
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (UserApiKeyRecord) | undefined;

		if(record === undefined)
			return null;

		return record;
	}

	return {
		getById,
		getByUserId: async (userId: number) => {
			const record = (await connection!.query(`
				SELECT id, userId, created, expiration, keyName, active, apiKey
				FROM userApiKey
				WHERE userId = :userId`, {
					replacements: {
						userId
					},
					type: QueryTypes.SELECT
			})) as UserApiKeyRecord[];

			return record;
		},
		insert: async (userApiKeyRecord: UserApiKeyRecordInsertFields) => {
			const result = (await connection!.query(`
				INSERT INTO userApiKey (userId, expiration, keyName, active, apiKey)
				VALUES (:userId, :expiration, :keyName, :active, :apiKey)
				RETURNING id`, {
					replacements: {
						userId: userApiKeyRecord.userId,
						expiration: userApiKeyRecord.expiration,
						keyName: userApiKeyRecord.keyName,
						active: userApiKeyRecord.active,
						apiKey: userApiKeyRecord.apiKey
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
				DELETE FROM userApiKey
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
				UPDATE userApiKey
				SET userId = :userId, expiration = :expiration, keyName = :keyName, active = :active, apiKey = :apiKey
				WHERE id = :id
				RETURNING id`, {
					replacements: {
						id,
						userId: userApiKeyRecord.userId,
						expiration: userApiKeyRecord.expiration,
						keyName: userApiKeyRecord.keyName,
						active: userApiKeyRecord.active,
						apiKey: userApiKeyRecord.apiKey
					},
					type: QueryTypes.UPDATE
			})).pop() as any;

			return result;
		},
		getByApiKey: async (apiKey: string) => {
			const record = (await connection!.query(`
				SELECT id, userId, created, expiration, keyName, active, apiKey
				FROM userApiKey
				WHERE apiKey = :apiKey`, {
					replacements: {
						apiKey
					},
					type: QueryTypes.SELECT
			})).pop() as (UserApiKeyRecord) | undefined;

			if(record === undefined)
				return null;

			return record;
		}	
	}
}