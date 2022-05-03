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

export module BoardMembershipQueryFunctions {
	// Standard Queries
	export type GetById = (id: number) => Promise<BoardMembershipRecord | null>;
	export type GetByBoardId = (boardId: number) => Promise<BoardMembershipRecord[]>;
	export type GetByUserId = (userId: number) => Promise<BoardMembershipRecord[]>;
	export type GetByUserIdAndBoardId = (userId: number, boardId: number) => Promise<BoardMembershipRecord | null>;
	export type Insert = (BoardMembershipRecord: BoardMembershipRecordInsertRequiredFields) => Promise<BoardMembershipRecord>;
	export type Delete = (id: number) => Promise<void>;

	// Specialized Queries
	export type GetMembersOrderedByJoined = (boardId: number) => Promise<BoardMembershipRecord[]>;
	export type GetAdmins = (boardId: number) => Promise<BoardMembershipRecord[]>;
}