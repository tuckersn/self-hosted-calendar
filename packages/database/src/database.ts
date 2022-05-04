import { Promisable } from "type-fest";

import { BoardMembershipQueryFunctions, BoardQueryFunctions, EventAttendeeQueryFunctions, EventQueryFunctions, TodoItemQueryFunctions, UserLoginQueryFunctions, UserQueryFunctions } from "@internal/schema/dist";
export interface Database {
	/**
	 * The name of the database.
	 */
	readonly name: string;

	/**
	 * Initialization function
	 */
	start: () => Promisable<void>;

	user: UserQueryFunctions;
	userLogins: UserLoginQueryFunctions;
	board: BoardQueryFunctions;
	boardMember: BoardMembershipQueryFunctions;
	event: EventQueryFunctions;
	eventAttendee: EventAttendeeQueryFunctions;
	todoItem: TodoItemQueryFunctions;	
}