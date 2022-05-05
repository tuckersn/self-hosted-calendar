import { ReadonlyDeep } from "type-fest";
import { QueryContext } from "./wrappers/database";

export interface EventRecord {
	id: number;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	location: string | null;
	organizer: number;
}

export type EventRecordInsertRequiredFields = Pick<EventRecord, 'name' | 'startDate' | 'endDate' | 'organizer'>;
export type EventRecordInsertOptionalFields = Pick<EventRecord, 'description' | 'location'>;
export type EventRecordInsertFields = EventRecordInsertOptionalFields & Partial<EventRecordInsertRequiredFields>;

export const DEFAULT_EVENT_RECORD_FIELDS: EventRecordInsertOptionalFields = {
	location: null,
	description: ""
}

export interface EventQueryFunctions {
	// Standard Queries
	getById: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<EventRecord | null>;
	insert: (context: ReadonlyDeep<QueryContext>, eventRecord: EventRecordInsertRequiredFields) => Promise<EventRecord>;
	update: (context: ReadonlyDeep<QueryContext>, eventRecord: EventRecord) => Promise<EventRecord>;
	delete: (context: ReadonlyDeep<QueryContext>, id: number) => Promise<void>;
}
