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
	getById: (id: number) => Promise<BoardMembershipRecord | null>;
	getByBoardId: (boardId: number) => Promise<BoardMembershipRecord[]>;
	getByUserId: (userId: number) => Promise<BoardMembershipRecord[]>;
	getByUserIdAndBoardId: (userId: number, boardId: number) => Promise<BoardMembershipRecord | null>;
	insert: (BoardMembershipRecord: BoardMembershipRecordInsertRequiredFields) => Promise<BoardMembershipRecord>;
	delete: (id: number) => Promise<void>;

	// Specialized Queries
	getMembersOrderedByJoinedDate: (boardId: number) => Promise<BoardMembershipRecord[]>;
	getAdmins: (boardId: number) => Promise<BoardMembershipRecord[]>;
}