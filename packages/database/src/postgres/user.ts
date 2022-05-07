import { Sequelize, QueryTypes } from "sequelize";
import { UserQueryFunctions, UserRecord, UserRecordInsertFields } from "@internal/schema/dist";

export function userQueryFunctions(connection: Sequelize): UserQueryFunctions {

	const getById: UserQueryFunctions['getById'] = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, uuid, username, email, created, displayName
			FROM user
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (UserRecord) | undefined;

		if(record === undefined)
			return null;

		return record;
	};
	
	return {

		getById,
		getByEmail: async (email: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, username, email, created, displayName
				FROM user
				WHERE email = :email`, {
					replacements: {
						email
					},
					type: QueryTypes.SELECT
			})).pop() as (UserRecord) | undefined;

			if(record === undefined)
				return null;

			return record;
		},
		getByUsername: async (username: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, username, email, created, displayName
				FROM user
				WHERE username = :username`, {
					replacements: {
						username
					},
					type: QueryTypes.SELECT
			})).pop() as (UserRecord) | undefined;

			if(record === undefined)
				return null;

			return record;
		},
		insert: async (userRecord: UserRecordInsertFields) => {
			const result = (await connection!.query(`
				INSERT INTO user (uuid, username, email, created, displayName)
				VALUES (uuid_generate_v4(), :username, :email, NOW(), :displayName)
				RETURNING id, uuid, username, email, created, displayName`, {
					replacements: {
						username: userRecord.username,
						email: userRecord.email,
						displayName: userRecord.displayName
					},
					type: QueryTypes.INSERT
			}));

			console.log("RESULT:", result);

			const record = await getById(result[0]);

			if(record === null) {
				throw new Error("Failed to insert user record, no record returned");
			}

			return record;
						
		},
		update: async (userRecord: UserRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		}
	};
};