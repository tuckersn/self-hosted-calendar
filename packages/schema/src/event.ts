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
	getById: (id: number) => Promise<EventRecord | null>;

	insert: (eventRecord: EventRecordInsertRequiredFields) => Promise<EventRecord>;
	update: (eventRecord: EventRecord) => Promise<EventRecord>;
	delete: (id: number) => Promise<void>;
}
