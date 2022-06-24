import { ReadonlyDeep } from "type-fest";
import { SlateNode, slateNodeFromStr } from "../serialization";


export interface EventRecord {
	id: number;
	uuid: string;
	name: string;
	description: SlateNode;
	startDate: Date;
	endDate: Date;
	location: string | null;
	calendarId: number;
}

export type EventRecordInsertRequiredFields = Pick<EventRecord, 'uuid' | 'name' | 'startDate' | 'endDate'>;
export type EventRecordInsertOptionalFields = Pick<EventRecord, 'description' | 'location'>;
export type EventRecordInsertFields = EventRecordInsertOptionalFields & Partial<EventRecordInsertRequiredFields>;

export const DEFAULT_EVENT_RECORD_FIELDS: EventRecordInsertOptionalFields = {
	location: null,
	description: slateNodeFromStr("")
}

export interface EventQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<EventRecord | null>;
	getByUUID: (uuid: string) => Promise<EventRecord | null>;
	insert: (eventRecord: EventRecordInsertFields) => Promise<EventRecord>;
	updateById: (eventRecord: EventRecord) => Promise<EventRecord>;
	updateByUUID: (eventRecord: EventRecord) => Promise<EventRecord>;
	delete: (id: number) => Promise<void>;

	getTimeRange: (startDate: Date, endDate: Date, calendarUUIDs?: string[]) => Promise<EventRecord[]>;
}
