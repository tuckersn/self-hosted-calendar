import { EventsRecord } from ".";

/**
 * EventRecord.id - {@link EventRecord#id}
 * //{@link https://github.com GitHub}
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
	isAttending: boolean;
	isHost: boolean;
}