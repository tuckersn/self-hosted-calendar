import { CalendarMembershipQueryFunctions } from "@internal/schema/dist"
import { Sequelize } from "sequelize/types"


export interface PostgresCalendarMemberRecord {
	id: number,
	user_id: number,
	calendar_id: number,
	joined: Date,
	is_admin: boolean,
	is_writer: boolean
}




export function calendarMemberQueryFunctions(connection: Sequelize): CalendarMembershipQueryFunctions {

	return {
		delete: async () => {
			throw new Error("Method not implemented.");
		},
		getById: async () => {
			throw new Error("Method not implemented.");
		},
		getByUserId: async () => {
			throw new Error("Method not implemented.");
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
					}
				})).pop() as (PostgresCalendarMemberRecord) | undefined;

			if(record === undefined)
				throw new Error("Failed to insert calendar record");

			return {
				id: record.id,
				calendarId: record.calendar_id,
				userId: record.user_id,
				isAdmin: record.is_admin,
				isWriter: record.is_writer,
				joined: record.joined
			}
		},
	}
};