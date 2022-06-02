import { ReadonlyDeep } from "type-fest";


export interface TaskBoardRecord {
	id: number;
	uuid: string;
	boardName: string;
	description: string;
	created: Date;
}

export type TaskBoardRecordInsertRequiredFields = Pick<TaskBoardRecord, 'boardName'>;
export type TaskBoardRecordInsertOptionalFields = Pick<TaskBoardRecord, 'description'>;
export type TaskBoardRecordInsertFields = TaskBoardRecordInsertOptionalFields & Partial<TaskBoardRecordInsertRequiredFields>;

export const DEFAULT_TASK_BOARD_RECORD_FIELDS: TaskBoardRecordInsertOptionalFields = {
	description: ""
}

export interface TaskBoardQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<TaskBoardRecord | null>;

	insert: (boardRecord: TaskBoardRecordInsertFields) => Promise<TaskBoardRecord>;
	update: (boardRecord: TaskBoardRecord) => Promise<TaskBoardRecord>;
	delete: (id: number) => Promise<void>;
}

