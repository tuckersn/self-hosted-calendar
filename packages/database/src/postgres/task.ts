import { TaskType, TaskStatus, TaskQueryFunctions, TaskRecord, TaskRecordInsertFields } from "@internal/schema/dist";
import { SlateNode, slateNodeFromStr } from "@internal/schema/dist/serialization";
import { result } from "lodash";
import { nanoid } from "nanoid";
import { QueryTypes, Sequelize, UUID } from "sequelize";

export interface PostgresTaskRecord {
	id: number;
	uuid: string;
	item_type: TaskType;
	status: TaskStatus;
	description: string;
	due: Date | null;
	updated: Date | null;
	completed: Date | null;
	created: Date;
}

export function taskQueryFunctions(connection: Sequelize): TaskQueryFunctions {
	const getByUUID = async (uuid: string) => {
		const record = (await connection!.query(`
			SELECT id, uuid, description, item_type, status, due, updated, completed, created
			FROM task
			WHERE uuid = :uuid`, {
				replacements: {
					uuid
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresTaskRecord) | undefined;

		if(record === undefined)
			return null;

		return {
			id: record.id,
			uuid: record.uuid,
			due: record.due,
			description: slateNodeFromStr(record.description),
			updated: record.updated,
			completed: record.completed,
			created: record.created,
			taskType: record.item_type,
			status: record.status
		} as TaskRecord;
	}

	const getById = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, uuid, description, item_type, status, due, updated, completed, created
			FROM task
			WHERE id = :id`, {
				replacements: {
					id
				},
				type: QueryTypes.SELECT
		})).pop() as (PostgresTaskRecord) | undefined;

		if(record === undefined)
			return null;
		
		return {
			id: record.id,
			uuid: record.uuid,
			description: slateNodeFromStr(record.description),
			taskType: record.item_type,
			status: record.status,
			due: record.due,
			updated: record.updated,
			completed: record.completed,
			created: record.created
		} as TaskRecord;
	}

	const getAll = async () => {
		const records = ((await connection!.query(`
			SELECT id, uuid, description, item_type, status, due, updated, completed, created
			FROM task`, {
				type: QueryTypes.SELECT
		})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
			return {
				id: record.id,
				uuid: record.uuid,
				description: slateNodeFromStr(record.description),
				taskType: record.item_type,
				status: record.status,
				due: record.due,
				updated: record.updated,
				completed: record.completed,
				created: record.created
			} as TaskRecord;
		})
	}

	return {
		getByUUID,
		getById,
		deleteById: async (id: number) => {
			await connection!.query(`
				DELETE FROM task
				WHERE id = :id`, {
					replacements: {
						id
					},
					type: QueryTypes.DELETE
				});
			},
			deleteByUUID: async (uuid: string) => {
				await connection!.query(`
					DELETE FROM task
					WHERE uuid = :uuid`, {
						replacements: {
							uuid
						},
						type: QueryTypes.DELETE
					});
				},
			insert: async (record: TaskRecordInsertFields) => {
				const result = (await connection!.query(`
					INSERT INTO task (uuid, item_type, status, due, updated, completed, created)
					VALUES (:uuid, :item_type, :status, :due, :updated, :completed, NOW())
					RETURNING id, description, uuid, itemType, status, due, updated, completed, created`, {
						replacements: {
							uuid: nanoid(),
							item_type: record.taskType,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed
						},
						type: QueryTypes.INSERT
					})).pop() as unknown as PostgresTaskRecord;

				return {
					id: result.id,
					uuid: result.uuid,
					taskType: result.item_type,
					status: result.status,
					due: result.due,
					updated: result.updated,
					completed: result.completed,
					created: result.created
				} as TaskRecord;
			},
			update: async (taskRecord: TaskRecord) => {
				(await connection!.query(`
					UPDATE task
					SET uuid = :uuid, item_type = :item_type, status = :status, due = :due, updated = :updated, completed = :completed, created = :created
					WHERE id = :id
					RETURNING id, description uuid, itemType, status, due, updated, completed, created`, {
						replacements: {
							uuid: taskRecord.uuid,
							item_type: taskRecord.taskType,
							status: taskRecord.status,
							due: taskRecord.due,
							updated: taskRecord.updated,
							completed: taskRecord.completed,
							created: taskRecord.created,
							id: taskRecord.id,
							description: taskRecord.description,
						}, 
							type: QueryTypes.UPDATE
						})).pop() as unknown as PostgresTaskRecord;

				return {
					id: taskRecord.id,
					uuid: taskRecord.uuid,
					taskType: taskRecord.taskType,
					status: taskRecord.status,
					due: taskRecord.due,
					updated: taskRecord.updated,
					completed: taskRecord.completed,
					created: taskRecord.created
				} as TaskRecord;
					
			},
			getRecentCompleted: async () => {
				const records = ((await connection!.query(`
					SELECT id, description, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE completed = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							description: slateNodeFromStr(record.description),
							taskType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					});
				return records;
			},
			getRecentCreated: async () => {
				const records = ((await connection!.query(`
					SELECT id, description, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE created = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							description: slateNodeFromStr(record.description),
							taskType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					}
				);
				return records;
			},
			getRecentInactive: async () => {
				const records = ((await connection!.query(`
					SELECT id, description, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE completed = false AND created = false
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							description: slateNodeFromStr(record.description),
							taskType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					});
				return records;
			},
			getRecentUpdated: async () => {
				const records = ((await connection!.query(`
					SELECT id, description, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE updated = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							description: slateNodeFromStr(record.description),
							taskType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					});

				return records.map((r) => {
					return {
						id: r.id,
						uuid: r.uuid,
						taskType: r.taskType,
						description: r.description,
						status: r.status,
						due: r.due,
						updated: r.updated,
						completed: r.completed,
						created: r.created
					} as TaskRecord;
				});
			},
			getUpcoming: async () => {
				const records = ((await connection!.query(`
					SELECT id, description, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE due > NOW()
					ORDER BY due ASC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							description: slateNodeFromStr(record.description),
							taskType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					});
				return records;
			}
	}
}