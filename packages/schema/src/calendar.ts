export enum CalendarType {
	/**
	 * Cannot delete this calendar.
	 * These calendars are created for every user, ideally upon sign up.
	 */
	PERSONAL = 0,
	/**
	 * These are access restricted calendars.
	 */
	SHAREABLE = 25,
	/**
	 * These are calendars anyone can view, but not edit.
	 */
	PUBLIC = 50
}

export interface CalendarRecord {
	id: number;
	name: string;
	description: string;
	color: string | null;
	calendarType: CalendarType

}

export type CalendarRecordInsertRequiredFields = Pick<CalendarRecord, 'name' | 'calendarType'>;
export type CalendarRecordInsertOptionalFields = Pick<CalendarRecord, 'color' | 'description'>;
export type CalendarRecordInsertFields = CalendarRecordInsertRequiredFields & Partial<CalendarRecordInsertOptionalFields>;

export const DEFAULT_CALENDAR_RECORD_FIELDS: CalendarRecordInsertOptionalFields = {
	color: null,
	description: ""
}


export interface CalendarQueryFunctions {

}