import { Sequelize, QueryTypes, Error as SequelizeError, UniqueConstraintError } from "sequelize";

import { CalendarQueryFunctions, CalendarRecord, CalendarRecordInsertFields, CalendarType } from "@internal/schema/dist";


export interface PostgresCalendarRecord {
	id: number;
	uuid: string;
	name: string;
	description: string;
	color: string | null;
	calendarType: CalendarType
}

export function calendarQueryFunctions(connection: Sequelize): CalendarQueryFunctions {

	return {
		delete: async (id: number) => {
			await connection.query(`
				DELETE FROM calendar
				WHERE id = :id`, {
					replacements: {
						id
					}
				})
		},
		getById: async (id: number) => {
			const record = (await connection!.query(`
				SELECT id, uuid, name, description, color, calendar_type
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
				name: record.name,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		getByUUID: async (uuid: string) => {
			const record = (await connection!.query(`
				SELECT id, uuid, name, description, color, calendar_type
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
				name: record.name,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		insert: async (calendarRecord: CalendarRecordInsertFields) => {
			const record = (await connection!.query(`
				INSERT INTO calendar (uuid, name, description, color, calendar_type)
				VALUES (:uuid, :name, :description, :color, :calendarType)
				RETURNING id, uuid, name, description, color, calendar_type`, {
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
				name: record.name,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		},
		update: async (calendarRecord: CalendarRecord) => {
			const record = (await connection!.query(`
				UPDATE calendar
				SET name = :name, description = :description, color = :color, calendar_type = :calendarType
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
				name: record.name,
				description: record.description,
				color: record.color,
				calendarType: record.calendarType
			}
		}
	}
}