import { ReadonlyDeep } from "type-fest";


export interface EventRecord {
	id: number;
	uuid: string;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	location: string | null;
}

export type EventRecordInsertRequiredFields = Pick<EventRecord, 'name' | 'startDate' | 'endDate'>;
export type EventRecordInsertOptionalFields = Pick<EventRecord, 'description' | 'location'>;
export type EventRecordInsertFields = EventRecordInsertOptionalFields & Partial<EventRecordInsertRequiredFields>;

export const DEFAULT_EVENT_RECORD_FIELDS: EventRecordInsertOptionalFields = {
	location: null,
	description: ""
}

export interface EventQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<EventRecord | null>;
	insert: (eventRecord: EventRecordInsertFields) => Promise<EventRecord>;
	update: (eventRecord: EventRecord) => Promise<EventRecord>;
	delete: (id: number) => Promise<void>;
}
