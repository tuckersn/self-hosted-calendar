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

export module EventQueryFunctions {
	// Standard Queries
	export type GetById = (id: number) => Promise<EventRecord | null>;

	export type Insert = (eventRecord: EventRecordInsertRequiredFields) => Promise<EventRecord>;
	export type Update = (eventRecord: EventRecord) => Promise<EventRecord>;
	export type Delete = (id: number) => Promise<void>;
}
