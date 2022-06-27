import { Sequelize, QueryTypes, Error as SequelizeError, UniqueConstraintError } from "sequelize";

import { EventQueryFunctions, EventRecord, EventRecordInsertFields } from "@internal/schema/dist";
import { SlateNode } from "@internal/schema/dist/serialization"

export interface PostgresEventRecord {
	id: number;
	uuid: string;
	event_name: string;
	description: SlateNode;
	start_date: Date;
	end_date: Date;
	location: string | null;
}

export function eventQueryFunctions(connection: Sequelize): EventQueryFunctions {
	const getByUUID = async (uuid: string) => {
		const record = (await connection!.query(`
			SELECT id, uuid, event_name, description, start_date, end_date, location
			FROM event
			WHERE uuid = :uuid`, {
				replacements: {
					uuid
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresEventRecord) | undefined;

		if(record === undefined)
			return null;

		return {
			id: record.id,
			uuid: record.uuid,
			name: record.event_name,
			description: record.description,
			startDate: record.start_date,
			endDate: record.end_date,
			location: record.location
		} as EventRecord;
	};

	const getById = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, uuid, event_name, description, start_date, end_date, location
			FROM event
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresEventRecord) | undefined;

		if(record === undefined)
			return null;

		return {
			id: record.id,
			uuid: record.uuid,
			name: record.event_name,
			description: record.description,
			startDate: record.start_date,
			endDate: record.end_date,
			location: record.location
		} as EventRecord;
	};
	
	return {
		getById,
		getByUUID,
		delete: async (uuid: string) => {
			const result = (await connection!.query(`
				DELETE FROM event
				WHERE uuid = :uuid
			`));

			return result as any;
		},		
		updateById: async (eventRecord: EventRecord) => {
			const { id, uuid, name, description, startDate, endDate, location } = eventRecord;

			const result = (await connection!.query(`
				UPDATE event
				SET uuid = :uuid, event_name = :name, description = :description, start_date = :startDate, end_date = :endDate, location = :location
				WHERE id = :id`, {
					replacements: {
						id,
						uuid,
						name,
						description,
						startDate,
						endDate,
						location
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
			})).pop() as unknown as  (PostgresEventRecord);

			return {
				id: result.id,
				uuid: result.uuid,
				name: result.event_name,
				description: result.description,
				startDate: result.start_date,
				endDate: result.end_date,
				location: result.location
			} as EventRecord;
		},		
		updateByUUID: async (eventRecord: EventRecord) => {
			const { id, uuid, name, description, startDate, endDate, location } = eventRecord;

			const result = (await connection!.query(`
				UPDATE event
				SET uuid = :uuid, event_name = :name, description = :description, start_date = :startDate, end_date = :endDate, location = :location
				WHERE uuid = :uuid`, {
					replacements: {
						id,
						uuid,
						name,
						description,
						startDate,
						endDate,
						location
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
			})).pop() as unknown as  (PostgresEventRecord);

			return {
				id: result.id,
				uuid: result.uuid,
				name: result.event_name,
				description: result.description,
				startDate: result.start_date,
				endDate: result.end_date,
				location: result.location
			} as EventRecord;
		},
		insert: async (eventRecord: EventRecordInsertFields) => {
			const result = (await connection!.query(`
				INSERT INTO event (uuid, event_name, description, start_date, end_date, location)
				VALUES (:uuid, :name, :description, :startDate, :endDate, :location)
				RETURNING id, uuid, name, description, start_date, end_date, location`, {
					replacements: {
						uuid: eventRecord.uuid,
						name: eventRecord.name,
						description: eventRecord.description,
						startDate: eventRecord.startDate,
						endDate: eventRecord.endDate,
						location: eventRecord.location
					},
					type: QueryTypes.RAW,
					//@ts-expect-error
					returning: true
			})).pop() as unknown as (PostgresEventRecord);
			
			return {
				id: result.id,
				uuid: result.uuid,
				name: result.event_name,
				description: result.description,
				startDate: result.start_date,
				endDate: result.end_date,
				location: result.location
			} as EventRecord;
		},
		getTimeRange: async (startDate: Date, endDate: Date) => {
			const result = (await connection!.query(`
				SELECT id, uuid, event_name, description, start_date, end_date, location
				FROM event
				WHERE start_date >= :startDate AND end_date <= :endDate
			`, {
				replacements: {
					startDate,
					endDate
				}
			})) as unknown as PostgresEventRecord[];

			return result.map((record: PostgresEventRecord) => {
				return {
					id: record.id,
					uuid: record.uuid,
					name: record.event_name,
					description: record.description,
					startDate: record.start_date,
					endDate: record.end_date,
					location: record.location
				} as EventRecord;
			});
		}
	}
}