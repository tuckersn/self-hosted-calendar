import { QueryContext } from "../queries";
import { CalendarMembershipRecord } from "./calendar-membership";

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
	uuid: string;
	name: string;
	description: string;
	color: string | null;
	calendarType: CalendarType

}

export interface ClientCalendarRecord {
	uuid: string;
	name: string;
	description: string;
	color: string | null;
	calendarType: CalendarType;
}

export type CalendarRecordInsertRequiredFields = Pick<CalendarRecord, 'name' | 'calendarType'>;
export type CalendarRecordInsertOptionalFields = Pick<CalendarRecord, 'color' | 'description'>;
export type CalendarRecordInsertFields = CalendarRecordInsertRequiredFields & Partial<CalendarRecordInsertOptionalFields>;

export const DEFAULT_CALENDAR_RECORD_FIELDS: CalendarRecordInsertOptionalFields = {
	color: null,
	description: ""
}


export interface CalendarQueryFunctions {
	// Standard Queries
	getById: (id: number, context: QueryContext) => Promise<CalendarRecord | null>;
	getByUUID: (uuid: string, context: QueryContext) => Promise<CalendarRecord | null>;
	insert: (calendarRecord: CalendarRecordInsertFields, context: QueryContext) => Promise<CalendarRecord>;
	update: (calendarRecord: CalendarRecord, context: QueryContext) => Promise<CalendarRecord>;
	deleteByUUID: (uuid: string, context: QueryContext) => Promise<void>;
	// Specialized Queries
	getListByUserUUID: (uuid: string, context: QueryContext) => Promise<(CalendarRecord & Pick<CalendarMembershipRecord, "isAdmin" | "isWriter" | "joined">)[]>;
}