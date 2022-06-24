

export interface PostgresCalendarMemberRecord {
	id: number,
	userId: number,
	calendarId: number,
	joined: Date,
	is_admin: boolean,
	is_writer: boolean
}