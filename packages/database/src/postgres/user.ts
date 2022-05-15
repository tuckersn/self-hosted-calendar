import { Sequelize, QueryTypes, Error as SequelizeError, UniqueConstraintError } from "sequelize";

import { UserErrors, UserQueryFunctions, UserRecord, UserRecordInsertFields, UserType } from "@internal/schema/dist";
import { UUID } from "@internal/common/dist";
export interface PostgresUserRecord {
	id: number;
	uuid: string;
	username: string;
	display_name: string;
	email: string;
	password_hash: string;
	password_salt: string;
	user_type: UserType;
	created: Date;
}


export function userQueryFunctions(connection: Sequelize): UserQueryFunctions {

	const getById: UserQueryFunctions['getById'] = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, uuid, username, email, created, display_name, user_type
			FROM user_
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresUserRecord) | undefined;

		if(record === undefined)
			return null;

		return {
			id: record.id,
			uuid: record.uuid,
			username: record.username,
			email: record.email,
			created: record.created,
			displayName: record.display_name,
			userType: record.user_type,
			passwordHash: record.password_hash
		};
	};
	
	return {

		getById,
		getByEmail: async (email: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, username, email, created, display_name, user_type
				FROM user_
				WHERE email = :email`, {
					replacements: {
						email
					},
					type: QueryTypes.SELECT
			})).pop() as (PostgresUserRecord) | undefined;

			if(record === undefined)
				return null;

			return {
				id: record.id,
				uuid: record.uuid,
				username: record.username,
				email: record.email,
				created: record.created,
				displayName: record.display_name,
				userType: record.user_type,
				passwordHash: record.password_hash
			};
		},
		getByUsername: async (username: string) => {
			const record = (await connection!.query(`
				SELECT *
				FROM "user_"
				WHERE username = :username`, {
					replacements: {
						username
					},
					type: QueryTypes.SELECT
			})).pop() as (PostgresUserRecord) | undefined;
			if(record === undefined)
				return null;

			return {
				id: record.id,
				uuid: record.uuid,
				username: record.username,
				email: record.email,
				created: record.created,
				displayName: record.display_name,
				userType: record.user_type,
				passwordHash: record.password_hash
			};
		},
		getByUUID: async (uuid: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, username, email, created, display_name, user_type
				FROM user_
				WHERE uuid = :uuid`, {
					replacements: {
						uuid
					},
					type: QueryTypes.SELECT
			})).pop() as (PostgresUserRecord) | undefined;

			if(record === undefined)
				return null;
			
			return {
				id: record.id,
				uuid: record.uuid,
				username: record.username,
				email: record.email,
				created: record.created,
				displayName: record.display_name,
				userType: record.user_type,
				passwordHash: record.password_hash
			};
		},
		insert: async (userRecord: UserRecordInsertFields) => {

			try {
				const result = (await connection!.query(`
					INSERT INTO user_ (uuid, username, email, display_name, user_type, password_hash)
					VALUES (:uuid, :username, :email, :displayName, :userType, :passwordHash)
					RETURNING id, uuid, username, email, created, display_name, user_type, password_hash`, {
						replacements: {
							uuid: UUID.upperAlphaNumeric(8),
							username: userRecord.username,
							email: userRecord.email,
							displayName: userRecord.displayName,
							userType: userRecord.userType,
							passwordHash: userRecord.passwordHash
						},
						type: QueryTypes.RAW
				}));

				// console.log("RESULT:", result);

				// const record = await getById(result[0]);
				if(!Array.isArray(result[0])) {
					throw new Error(`Invalid result of ${result} here.`);
				}

				const record = result[0][0];

				if(record === null || record === undefined) {
					throw new Error("Failed to insert user record, no record returned");
				}

				return record;
			} catch(e: any) {
				if(e instanceof UniqueConstraintError) {
					if(e.parent.message.includes(`duplicate key value violates unique constraint "index_user_username"`)) {
						throw UserErrors.UsernameTakenError();
					} else if(e.parent.message.includes(`duplicate key value violates unique constraint "index_user_email"`)) {
						throw UserErrors.EmailTakenError();
					}
				}
				throw e;
			}
						
		},
		updateById: async (id: number, userRecord: Partial<UserRecord>) => {
			const record = getById(id);
			if(record === null) {
				throw new Error("Failed to update user record, no record with that id");
			}

			userRecord = Object.assign(record, userRecord);

			const result = (await connection!.query(`
				UPDATE user_
				SET id=:id, uuid=:uuid, username=:username, email=:email, passwordHash=:passwordHash, displayName=:displayName, userType=:userType
				WHERE id = :id
				RETURNING id, uuid, username, email, created, display_name, user_type`, {
					replacements: {
						id,
						username: userRecord.username,
						email: userRecord.email,
						displayName: userRecord.displayName,
						passwordHash: userRecord.passwordHash,
						uuid: userRecord.uuid,
						userType: userRecord.userType
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
				})).pop() as (PostgresUserRecord) | undefined;

			if(result === undefined) {
				throw new Error("Failed to update user record, no record returned");
			}			
				
			
			return {
				id: result.id,
				uuid: result.uuid,
				username: result.username,
				email: result.email,
				created: result.created,
				displayName: result.display_name,
				userType: result.user_type,
				passwordHash: result.password_hash
			};
		},
		delete: async (id: number) => {
			const result = (await connection!.query(`
				DELETE FROM user_
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