import { ReadonlyDeep } from "type-fest";

import { QueryContext } from "./wrappers/database";

export interface BoardMembershipRecord {
	id: number;
	userId: number;
	boardId: number;
	isAdmin: boolean;
	joined: Date;
}

export type BoardMembershipRecordInsertRequiredFields = Pick<BoardMembershipRecord, 'userId' | 'boardId'>;
export type BoardMembershipRecordInsertOptionalFields = Pick<BoardMembershipRecord, 'isAdmin'>;
export type BoardMembershipRecordInsertFields = BoardMembershipRecordInsertOptionalFields & Partial<BoardMembershipRecordInsertRequiredFields>;

export const DEFAULT_BOARD_MEMBERSHIP_RECORD_FIELDS: BoardMembershipRecordInsertOptionalFields = {
	isAdmin: false
}

export interface BoardMembershipQueryFunctions {
	// Standard Queries
	getById: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<BoardMembershipRecord | null>;
	getByBoardId: (context: ReadonlyDeep<QueryContext>, boardId: number) => Promise<BoardMembershipRecord[]>;
	getByUserId: (context: ReadonlyDeep<QueryContext>, userId: number) => Promise<BoardMembershipRecord[]>;
	getByUserIdAndBoardId: (context: ReadonlyDeep<QueryContext>, userId: number, boardId: number) => Promise<BoardMembershipRecord | null>;
	insert: (context: ReadonlyDeep<QueryContext>, BoardMembershipRecord: BoardMembershipRecordInsertRequiredFields) => Promise<BoardMembershipRecord>;
	delete: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<void>;

	// Specialized Queries
	getMembersOrderedByJoinedDate: (context: QueryContext, boardId: number) => Promise<BoardMembershipRecord[]>;
	getAdmins: (context: ReadonlyDeep<QueryContext>, boardId: number) => Promise<BoardMembershipRecord[]>;
}