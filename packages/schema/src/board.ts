export interface BoardRecord {
	id: number;
	name: string;
	description: string;
	created: Date;
}

export type BoardRecordInsertRequiredFields = Pick<BoardRecord, 'name'>;
export type BoardRecordInsertOptionalFields = Pick<BoardRecord, 'description'>;
export type BoardRecordInsertFields = BoardRecordInsertOptionalFields & Partial<BoardRecordInsertRequiredFields>;

export const DEFAULT_BOARD_RECORD_FIELDS: BoardRecordInsertOptionalFields = {
	description: ""
}

export interface BoardQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<BoardRecord | null>;

	insert: (boardRecord: BoardRecordInsertRequiredFields) => Promise<BoardRecord>;
	update: (boardRecord: BoardRecord) => Promise<BoardRecord>;
	delete: (id: number) => Promise<void>;
}

