import { ReadonlyDeep } from "type-fest";


export interface BoardRecord {
	id: number;
	uuid: string;
	boardName: string;
	description: string;
	created: Date;
}

export type BoardRecordInsertRequiredFields = Pick<BoardRecord, 'boardName'>;
export type BoardRecordInsertOptionalFields = Pick<BoardRecord, 'description'>;
export type BoardRecordInsertFields = BoardRecordInsertOptionalFields & Partial<BoardRecordInsertRequiredFields>;

export const DEFAULT_BOARD_RECORD_FIELDS: BoardRecordInsertOptionalFields = {
	description: ""
}

export interface BoardQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<BoardRecord | null>;

	insert: (boardRecord: BoardRecordInsertFields) => Promise<BoardRecord>;
	update: (boardRecord: BoardRecord) => Promise<BoardRecord>;
	delete: (id: number) => Promise<void>;
}

