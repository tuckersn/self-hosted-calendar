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

export module BoardQueryFunctions {
	// Standard Queries
	export type GetById = (id: number) => Promise<BoardRecord | null>;

	export type Insert = (boardRecord: BoardRecordInsertRequiredFields) => Promise<BoardRecord>;
	export type Update = (boardRecord: BoardRecord) => Promise<BoardRecord>;
	export type Delete = (id: number) => Promise<void>;
}

