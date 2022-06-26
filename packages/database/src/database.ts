import { Promisable } from "type-fest";

import { TaskBoardMembershipQueryFunctions, TaskBoardQueryFunctions, EventAttendeeQueryFunctions, EventQueryFunctions, TaskQueryFunctions, UserApiKeyQueryFunctions, UserLoginQueryFunctions, UserQueryFunctions, CalendarQueryFunctions, CalendarMembershipQueryFunctions } from "@internal/schema/dist/index";
export interface Database {
	/**
	 * The name of the database.
	 */
	readonly name: string;

	user: UserQueryFunctions;
	userLogin: UserLoginQueryFunctions;
	calendar: CalendarQueryFunctions;
	calendarMember: CalendarMembershipQueryFunctions;
	userApiKey: UserApiKeyQueryFunctions;
	board: TaskBoardQueryFunctions;
	boardMember: TaskBoardMembershipQueryFunctions;
	event: EventQueryFunctions;
	eventAttendee: EventAttendeeQueryFunctions;
	task: TaskQueryFunctions;
}