import { Promisable } from "type-fest";

import { BoardMembershipQueryFunctions, BoardQueryFunctions, EventAttendeeQueryFunctions, EventQueryFunctions, TodoItemQueryFunctions, UserLoginQueryFunctions, UserQueryFunctions } from "@internal/schema/dist/index";
export interface Database {
	/**
	 * The name of the database.
	 */
	readonly name: string;

	user: UserQueryFunctions;
	userLogins: UserLoginQueryFunctions;
	board: BoardQueryFunctions;
	boardMember: BoardMembershipQueryFunctions;
	event: EventQueryFunctions;
	eventAttendee: EventAttendeeQueryFunctions;
	todoItem: TodoItemQueryFunctions;	
}