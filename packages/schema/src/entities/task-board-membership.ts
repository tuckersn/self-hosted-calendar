import { ReadonlyDeep } from "type-fest";



export interface TaskBoardMembershipRecord {
	id: number;
	userId: number;
	boardId: number;
	isAdmin: boolean;
	joined: Date;
}

export type TaskBoardMembershipRecordInsertRequiredFields = Pick<TaskBoardMembershipRecord, 'userId' | 'boardId'>;
export type TaskBoardMembershipRecordInsertOptionalFields = Pick<TaskBoardMembershipRecord, 'isAdmin'>;
export type TaskBoardMembershipRecordInsertFields = TaskBoardMembershipRecordInsertOptionalFields & Partial<TaskBoardMembershipRecordInsertRequiredFields>;

export const DEFAULT_TASK_BOARD_MEMBERSHIP_RECORD_FIELDS: TaskBoardMembershipRecordInsertOptionalFields = {
	isAdmin: false
}

export interface TaskBoardMembershipQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<TaskBoardMembershipRecord | null>;
	getByBoardId: (boardId: number) => Promise<TaskBoardMembershipRecord[]>;
	getByUserId: (userId: number) => Promise<TaskBoardMembershipRecord[]>;
	getByUserIdAndBoardId: (userId: number, boardId: number) => Promise<TaskBoardMembershipRecord | null>;
	insert: (BoardMembershipRecord: TaskBoardMembershipRecordInsertFields) => Promise<TaskBoardMembershipRecord>;
	delete: (id: number) => Promise<void>;

	// Specialized Queries
	getMembersOrderedByJoinedDate: (boardId: number) => Promise<TaskBoardMembershipRecord[]>;
	getAdmins: (boardId: number) => Promise<TaskBoardMembershipRecord[]>;
}