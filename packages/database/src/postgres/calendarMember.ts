import { CalendarMembershipQueryFunctions, CalendarMembershipRecord } from "@internal/schema/dist"
import { QueryTypes, Sequelize } from "sequelize/types"


export interface PostgresCalendarMemberRecord {
	id: number,
	user_id: number,
	calendar_id: number,
	joined: Date,
	is_admin: boolean,
	is_writer: boolean
}

function postgresCalendarMemberRecordTransform(record: PostgresCalendarMemberRecord | undefined): CalendarMembershipRecord | null {
	if(record === undefined) {
		return null;
	}
	return {
		id: record.id,
		calendarId: record.calendar_id,
		userId: record.user_id,
		isAdmin: record.is_admin,
		isWriter: record.is_writer,
		joined: record.joined
	}
}


export function calendarMemberQueryFunctions(connection: Sequelize): CalendarMembershipQueryFunctions {

	return {
		delete: async (id: number) => {
			await connection!.query(`
				DELETE FROM calendar_member
				WHERE id = :id
			`, {
				replacements: {
					id
				},
				type: QueryTypes.DELETE
			});
		},
		getById: async (id: number) => {
			const record = (await connection!.query(`
				SELECT id, uuid, calendar_id, user_id, is_admin, is_writer, joined
				FROM calendar_member
				WHERE id = :id
			`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
			})).pop() as (PostgresCalendarMemberRecord) | undefined;

			return postgresCalendarMemberRecordTransform(record)!;
		},
		getByUserId: async (userId: number) => {
			const record = (await connection!.query(`
				SELECT id, uuid, calendar_id, user_id, is_admin, is_writer, joined
				FROM calendar_member
				WHERE user_id = :userId
			`, {
				replacements: {
					userId: userId
				},
				type: QueryTypes.SELECT
			})) as PostgresCalendarMemberRecord[];

			return record.map((record) => {
				return postgresCalendarMemberRecordTransform(record)!;
			});
		},
		insert: async (calendarMemberRecord, context) => {
			const record = (await connection!.query(`
				INSERT INTO calendar_member (calendar_id, user_id, is_admin, is_writer, joined)
				VALUES (:calendarId, :userId, :isAdmin, :isWriter, NOW())
				RETURNING id, uuid, calendar_id, user_id, is_admin, is_writer, joined`, {
					replacements: {
						isAdmin: calendarMemberRecord.isAdmin,
						isWriter: calendarMemberRecord.isWriter,
						userId: calendarMemberRecord.userId,
						calendarId: calendarMemberRecord.calendarId
					},
					type: QueryTypes.INSERT
				})).pop() as (PostgresCalendarMemberRecord) | undefined;

			if(record === undefined)
				throw new Error("Failed to insert calendar record");

			return postgresCalendarMemberRecordTransform(record)!;
		},
	}
};