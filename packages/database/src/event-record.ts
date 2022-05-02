export interface EventsRecord {
	id: number;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	location: string | null;
	organizer: number;
}

export type EventsRecordInsertRequiredFields = Pick<EventsRecord, 'name' | 'startDate' | 'endDate' | 'organizer'>;

export const DEFAULT_EVENTS_RECORD_FIELDS: Pick<EventsRecord, 'location' | 'description'> = {
	location: null,
	description: ""
}
