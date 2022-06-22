import { QueryContext } from "../queries";

export interface CalendarMembershipRecord {
	id: number;
	userId: number;
	calendarId: number;
	isAdmin: boolean;
	isWriter: boolean;
	joined: Date;
}

export type CalendarMembershipRecordInsertRequiredFields = Pick<CalendarMembershipRecord, 'userId' | 'calendarId'>;
export type CalendarMembershipRecordInsertOptionalFields = Pick<CalendarMembershipRecord, 'isAdmin' | 'isWriter'>;
export type CalendarMembershipRecordInsertFields = CalendarMembershipRecordInsertOptionalFields & Partial<CalendarMembershipRecordInsertRequiredFields>;

export const DEFAULT_CALENDAR_MEMBERSHIP_RECORD_FIELDS: CalendarMembershipRecordInsertOptionalFields = {
	isAdmin: false,
	isWriter: false
}

export interface CalendarMembershipQueryFunctions {
	getById: (id: number, context: QueryContext) => Promise<CalendarMembershipRecord | null>;
	getByUserId: (userId: number, context: QueryContext) => Promise<CalendarMembershipRecord[]>;
	insert: (BoardMembershipRecord: CalendarMembershipRecordInsertFields, context: QueryContext) => Promise<CalendarMembershipRecord>;
	delete: (id: number, context: QueryContext) => Promise<void>;
}