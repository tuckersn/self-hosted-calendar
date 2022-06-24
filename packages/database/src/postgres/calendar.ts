import { Sequelize, QueryTypes, Error as SequelizeError, UniqueConstraintError } from "sequelize";

import { CalendarQueryFunctions, CalendarRecord, CalendarRecordInsertFields, CalendarType } from "@internal/schema/dist";

import { PostgresCalendarMemberRecord } from "./calendarMember";

export interface PostgresCalendarRecord {
	id: number;
	uuid: string;
	calendarName: string;
	description: string;
	color: string | null;
	calendarType: CalendarType
}

export function calendarQueryFunctions(connection: Sequelize): CalendarQueryFunctions {

	return {
		deleteByUUID: async (uuid: string) => {
			await connection.query(`
				DELETE FROM calendar
				WHERE uuid = :uuid`, {
					replacements: {
						uuid
					}
				})
		},
		getById: async (id: number) => {
			const record = (await connection!.query(`
				SELECT id, uuid, calendarName, description, color, calendar_type
				FROM calendar
				WHERE id = :id`, {
					replacements: {
						id
					}
				})).pop() as (PostgresCalendarRecord) | undefined;

			if(record === undefined)
				return null;

			return {
				id: record.id,
				uuid: record.uuid,
				name: record.calendarName,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		getByUUID: async (uuid: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, calendarName, description, color, calendar_type
				FROM calendar
				WHERE uuid = :uuid`, {
					replacements: {
						uuid
					}
				})).pop() as (PostgresCalendarRecord) | undefined;

			if(record === undefined)
				return null;

			return {
				id: record.id,
				uuid: record.uuid,
				name: record.calendarName,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		insert: async (calendarRecord: CalendarRecordInsertFields) => {
			const record = (await connection!.query(`
				INSERT INTO calendar (uuid, calendarName, description, color, calendar_type)
				VALUES (:uuid, :name, :description, :color, :calendarType)
				RETURNING id, uuid, calendarName, description, color, calendar_type`, {
					replacements: {
						name: calendarRecord.name,
						description: calendarRecord.description,
						color: calendarRecord.color,
						calendarType: calendarRecord.calendarType
					}
				})).pop() as (PostgresCalendarRecord) | undefined;

			if(record === undefined)
				throw new Error("Failed to insert calendar record");

			return {
				id: record.id,
				uuid: record.uuid,
				name: record.calendarName,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		update: async (calendarRecord: CalendarRecord) => {
			const record = (await connection!.query(`
				UPDATE calendar
				SET calendarName = :name, description = :description, color = :color, calendar_type = :calendarType
				WHERE id = :id
				RETURNING id, uuid, name, description, color, calendar_type`, {
					replacements: {
						id: calendarRecord.id,
						name: calendarRecord.name,
						description: calendarRecord.description,
						color: calendarRecord.color,
						calendarType: calendarRecord.calendarType
					}
				})).pop() as (PostgresCalendarRecord) | undefined;

			if(record === undefined)
				throw new Error("Failed to update calendar record");

			return {
				id: record.id,
				uuid: record.uuid,
				name: record.calendarName,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		getListByUserUUID: async (userUUID: string) => {

			const records = (await connection!.query(`
				SELECT C.id, C.uuid, C.calendarName, C.description, C.color, C.calendar_type, CM.is_
				FROM calendar as C
				LEFT OUTER JOIN calendar_member as CM
				ON C.id = CM.calendarId
				LEFT OUTER JOIN user_ as U
				ON CM.userId = U.id
				WHERE U.uuid = :userUUID
			`, {
				replacements: {
					userUUID
				}
			})) as (PostgresCalendarRecord & Pick<PostgresCalendarMemberRecord, 'is_admin' | 'is_writer' | 'joined'>)[];

			return records.map((record) => {
				return {
					id: record.id,
					calendarType: record.calendarType,
					description: record.description,
					color: record.color,
					isAdmin: record.is_admin,
					isWriter: record.is_writer,
					joined: record.joined,
					name: record.calendarName,
					uuid: record.uuid
				};
			});

		}
	}
}