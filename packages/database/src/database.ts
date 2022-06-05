import { Promisable } from "type-fest";

import { TaskBoardMembershipQueryFunctions, TaskBoardQueryFunctions, EventAttendeeQueryFunctions, EventQueryFunctions, TodoItemQueryFunctions, UserApiKeyQueryFunctions, UserLoginQueryFunctions, UserQueryFunctions } from "@internal/schema/dist/index";
export interface Database {
	/**
	 * The name of the database.
	 */
	readonly name: string;

	user: UserQueryFunctions;
	userLogin: UserLoginQueryFunctions;
	userApiKey: UserApiKeyQueryFunctions;
	board: TaskBoardQueryFunctions;
	boardMember: TaskBoardMembershipQueryFunctions;
	event: EventQueryFunctions;
	eventAttendee: EventAttendeeQueryFunctions;
	todoItem: TodoItemQueryFunctions;	
}