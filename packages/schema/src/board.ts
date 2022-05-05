import { ReadonlyDeep } from "type-fest";
import { QueryContext } from "./wrappers/database";

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
	getById: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<BoardRecord | null>;

	insert: (context: ReadonlyDeep<QueryContext>, boardRecord: BoardRecordInsertRequiredFields) => Promise<BoardRecord>;
	update: (context: ReadonlyDeep<QueryContext>, boardRecord: BoardRecord) => Promise<BoardRecord>;
	delete: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<void>;
}

