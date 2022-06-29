import { UserLoginMethod, UserLoginQueryFunctions, UserLoginRecord } from "@internal/schema/dist";
import { nanoid } from "nanoid";
import { returnRecord } from "../sequelizeUtils";
import { QueryTypes, Sequelize } from "sequelize/types";

interface PostgresUserLoginRecord {
	id: number;
	user_id: number;
	login_date: Date;
	ip: string;
	login_method: UserLoginMethod;
	user_agent: string;
}


function postgresRecordToStandardRecord(record: PostgresUserLoginRecord): UserLoginRecord {
	return {
		id: record.id,
		userId: record.user_id,
		ip: record.ip,
		loginDate: record.login_date,
		loginMethod: record.login_method,
		userAgent: record.user_agent
	}
}


export function userLoginQueryFunction(connection: Sequelize): UserLoginQueryFunctions {
	return {
		async getById(id) {
			const record = (await connection!.query(`
				SELECT id, user_id, login_date, ip, login_method, user_agent
				FROM user_login
				WHERE id = :id
			`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
			})).pop() as PostgresUserLoginRecord | undefined;

			if(record === undefined)
				return null;

			return postgresRecordToStandardRecord(record);
		},
		async getByEmail(email) {
			// Emails should be unique to an account
			const record = (await connection!.query(`
				SELECT id, user_id, login_date, ip, login_method, user_agent
				FROM user_login
				WHERE email = :email
			`, {
				replacements: {
					email
				},
				type: QueryTypes.SELECT
			})).pop() as PostgresUserLoginRecord | undefined;

			if(record === undefined)
				return null;

			return postgresRecordToStandardRecord(record);
		},
		async delete(id) {
			await connection!.query(`
				DELETE FROM user_login
				WHERE id = :Id
			`, {
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			});
		},
		async getByIp(ip) {
			const records = (await connection.query(`
				SELECT id, user_id, login_date, ip, login_method, user_agent
				FROM user_login
				WHERE ip = :ip
			`, {
				replacements: {
					ip
				},
				type: QueryTypes.SELECT
			})) as PostgresUserLoginRecord[];

			return records.map((record) => {
				return postgresRecordToStandardRecord(record);
			});
		},
		async getByUserId(userId) {
			const records = (await connection.query(`
				SELECT id, user_id, login_date, ip, login_method, user_agent
				FROM user_login
				WHERE user_id = :userId  
			`, {
				replacements: {
					userId
				}
			})) as PostgresUserLoginRecord[];

			return records.map((record) => {
				return postgresRecordToStandardRecord(record);
			});
		},
		async getByUsername(username) {
			const records = (await connection.query(`
				SELECT UL.id, UL.user_id, UL.login_date, UL.ip, UL.user_agent
				FROM user_login AS UL
				LEFT OUTER JOIN user_ AS U
				ON UL.user_id = U.id
				WHERE U.username = :username
			`, {
				replacements: {
					username
				},
				type: QueryTypes.SELECT
			})) as PostgresUserLoginRecord[];

			return records.map((record) => {
				return postgresRecordToStandardRecord(record);
			});
		},
		async insert(insertRecord) {
			const record = returnRecord<PostgresUserLoginRecord>(await connection.query(`
				INSERT INTO user_ (userId, ip, userAgent, loginMethod, uuid)
				VALUES (:userId, :ip, :userAgent, :loginMethod, :uuid)
				RETURN id, uuid, login_date, ip, user_agent
			`, {
				replacements: {
					uuid: nanoid(),
					loginMethod: insertRecord.loginMethod,
					ip: insertRecord.ip,
					userId: insertRecord.userId,
					userAgent: insertRecord.userAgent
				},
				type: QueryTypes.RAW
			}));
			return postgresRecordToStandardRecord(record);
		}
	}
}