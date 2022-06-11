import { TaskType, TaskStatus, TaskQueryFunctions, TaskRecord } from "@internal/schema/dist";
import { QueryTypes, Sequelize } from "sequelize";

export interface PostgresTaskRecord {
	id: number;
	uuid: string;
	item_type: TaskType;
	status: TaskStatus;
	due: Date | null;
	updated: Date | null;
	completed: Date | null;
	created: Date;
}

export function taskQueryFunctions(connection: Sequelize): TaskQueryFunctions {
	const getByUUID = async (uuid: string) => {
		const record = (await connection!.query(`
			SELECT id, uuid, item_type, status, due, updated, completed, created
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
			updated: record.updated,
			completed: record.completed,
			created: record.created,
			itemType: record.item_type,
			status: record.status
		} as TaskRecord;
	}

	const getById = async (id: number) => {
		const record = (await connection!.query(`
			SELECT id, uuid, item_type, status, due, updated, completed, created
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
			itemType: record.item_type,
			status: record.status,
			due: record.due,
			updated: record.updated,
			completed: record.completed,
			created: record.created
		} as TaskRecord;
	}

	const getAll = async () => {
		const records = ((await connection!.query(`
			SELECT id, uuid, item_type, status, due, updated, completed, created
			FROM task`, {
				type: QueryTypes.SELECT
		})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
			return {
				id: record.id,
				uuid: record.uuid,
				itemType: record.item_type,
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
			insert: async (taskRecord: TaskRecord) => {
				const { id } = (await connection!.query(`
					INSERT INTO task (uuid, item_type, status, due, updated, completed, created)
					VALUES (:uuid, :item_type, :status, :due, :updated, :completed, :created)
					RETURNING id`, {
						replacements: {
							uuid: taskRecord.uuid,
							item_type: taskRecord.itemType,
							status: taskRecord.status,
							due: taskRecord.due,
							updated: taskRecord.updated,
							completed: taskRecord.completed,
							created: taskRecord.created
						},
						type: QueryTypes.INSERT
					})).pop() as { id: number };
			},
			update: async (taskRecord: TaskRecord) => {
				(await connection!.query(`
					UPDATE task
					SET uuid = :uuid, item_type = :item_type, status = :status, due = :due, updated = :updated, completed = :completed, created = :created
					WHERE id = :id`, {
						replacements: {
							uuid: taskRecord.uuid,
							item_type: taskRecord.itemType,
							status: taskRecord.status,
							due: taskRecord.due,
							updated: taskRecord.updated,
							completed: taskRecord.completed,
							created: taskRecord.created,
							id: taskRecord.id
							}, 
							type: QueryTypes.UPDATE
							})).pop() as { id: number };
			},
			getRecentCompleted: async () => {
				const records = ((await connection!.query(`
					SELECT id, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE completed = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							itemType: record.item_type,
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
					SELECT id, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE created = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							itemType: record.item_type,
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
					SELECT id, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE completed = false AND created = false
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							itemType: record.item_type,
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
					SELECT id, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE updated = true
					ORDER BY updated DESC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							itemType: record.item_type,
							status: record.status,
							due: record.due,
							updated: record.updated,
							completed: record.completed,
							created: record.created
						} as TaskRecord;
					});
				return records;
			},
			getUpcoming: async () => {
				const records = ((await connection!.query(`
					SELECT id, uuid, item_type, status, due, updated, completed, created
					FROM task
					WHERE due > NOW()
					ORDER BY due ASC
					LIMIT 10`, {
						type: QueryTypes.SELECT
					})) as PostgresTaskRecord[]).map((record: PostgresTaskRecord) => {
						return {
							id: record.id,
							uuid: record.uuid,
							itemType: record.item_type,
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