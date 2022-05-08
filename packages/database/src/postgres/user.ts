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
		updateById: async (id: number, userRecord: Partial<UserRecord>) => {
			const record = getById(id);
			if(record === null) {
				throw new Error("Failed to update user record, no record with that id");
			}

			const result: Array<any> = (await connection!.query(`
				UPDATE public."user"
				SET id=:id, uuid=:uuid, username=:username, email=:email, passwordHash=:passwordHash, displayName=:displayName
				WHERE id = :id
				RETURNING id, uuid, username, email, created, displayName`, {
					replacements: {
						id,
						username: userRecord.username,
						email: userRecord.email,
						displayName: userRecord.displayName,
						passwordHash: userRecord.passwordHash,
						uuid: userRecord.uuid
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
				}));
			
			return result.pop()! as UserRecord;
		},
		delete: async (id: number) => {
			const result = (await connection!.query(`
				DELETE FROM user
				WHERE id = :id`, {
					replacements: {
						id
					},
					type: QueryTypes.DELETE
				}));

			return result;
		}
	};
};