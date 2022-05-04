export enum EventAttendeeStatus {
	NoResponse = 0,
	Attending = 1,
	MaybeAttending = 2,
	NotAttending = 3
}

export function EventAttendeeStatusToString(status: EventAttendeeStatus): string {
	switch (status) {
		case EventAttendeeStatus.NoResponse:
			return "No Response";
		case EventAttendeeStatus.Attending:
			return "Attending";
		case EventAttendeeStatus.MaybeAttending:
			return "Maybe Attending";
		case EventAttendeeStatus.NotAttending:
			return "Not Attending";
		default:
			throw new Error("Invalid EventAttendeeStatus");
	}
}

export function EventAttendeeStatusFromString(status: string): EventAttendeeStatus {
	switch (status) {
		case "No Response":
			return EventAttendeeStatus.NoResponse;
		case "Attending":
			return EventAttendeeStatus.Attending;
		case "Maybe Attending":
			return EventAttendeeStatus.MaybeAttending;
		case "Not Attending":
			return EventAttendeeStatus.NotAttending;
		default:
			throw new Error("Invalid EventAttendeeStatus");
	}
}

/**
 * Many to Many relationship between the `Event` & `User` tables.
 * 
 * Hosts have administration rights over the event.
 */
export interface EventAttendeeRecord {
	id: number;
	/**
	 * EventRecord.id of the event this attendee is attending
	 */
	eventId: number;
	/**
	 * UserRecord.id of the attendee of this EventAttendeeRecord
	 */
	userId: number;
	isAttending: EventAttendeeStatus;
	isHost: boolean;
}

export type EventAttendeeRecordInsertRequiredFields = Pick<EventAttendeeRecord, 'eventId' | 'userId'>;
export type EventAttendeeRecordInsertOptionalFields = Pick<EventAttendeeRecord, 'isHost' | 'isAttending'>;
export type EventAttendeeRecordInsertFields = EventAttendeeRecordInsertRequiredFields & Partial<EventAttendeeRecordInsertOptionalFields>;


export const DEFAULT_EVENT_ATTENDEE_RECORD_FIELDS: EventAttendeeRecordInsertOptionalFields = {
	isAttending: EventAttendeeStatus.NoResponse,
	isHost: false
}

export interface EventAttendeeQueryFunctions {
	// Standard Queries
	getById: (id: number) => Promise<EventAttendeeRecord | null>;
	getByEventId: (eventId: number) => Promise<EventAttendeeRecord[]>;
	getByUserId: (userId: number) => Promise<EventAttendeeRecord[]>;
	getByUserIdAndEventId: (userId: number, eventId: number) => Promise<EventAttendeeRecord | null>;

	insert: (EventAttendeeRecord: EventAttendeeRecord) => Promise<EventAttendeeRecord>;
	delete: (EventAttendeeRecord: EventAttendeeRecord) => Promise<void>;
	update: (EventAttendeeRecord: EventAttendeeRecord) => Promise<EventAttendeeRecord>;
}