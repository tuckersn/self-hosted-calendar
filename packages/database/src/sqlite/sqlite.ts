import { UserQueryFunctions, UserLoginQueryFunctions, BoardQueryFunctions, BoardMembershipQueryFunctions, EventQueryFunctions, EventAttendeeQueryFunctions, TodoItemQueryFunctions, UserRecordInsertRequiredFields, UserRecord, UserLoginRecordInsertRequiredFields, BoardRecord, BoardRecordInsertRequiredFields, EventRecordInsertRequiredFields, EventRecord, BoardMembershipRecordInsertRequiredFields, EventAttendeeRecordInsertRequiredFields, TodoItemRecordInsertRequiredFields, TodoItemRecord, TodoItemRecordInsertFields } from "@internal/schema/dist";
import { QueryContext } from "@internal/schema/dist/wrappers/database";
import { Promisable, ReadonlyDeep } from "type-fest";
import { Database } from "../database";

//--------------------------------------------------------//
//
// It's a lot of overheard to support multiple databases,
// but I would like to keep the door open to it. This is
// a placeholder for the actual database implementation.
//
//--------------------------------------------------------//
export const SqliteDatabase: Database = {
	name: "sqlite",
	start: async () => {
		return;
	},
	user: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		getByEmail: async (context: ReadonlyDeep<QueryContext>, email: string) => {
			throw new Error("Method not implemented.");
		},
		getByUsername: async (context: ReadonlyDeep<QueryContext>, username: string) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, userRecord: UserRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (context: ReadonlyDeep<QueryContext>, userRecord: UserRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	userLogins: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		getByUsername: async (context: ReadonlyDeep<QueryContext>, username: string) => {
			throw new Error("Method not implemented.");
		},
		getByEmail: async (context: ReadonlyDeep<QueryContext>, email: string) => {
			throw new Error("Method not implemented.");
		},
		getByIp: async (context: ReadonlyDeep<QueryContext>, ip: string) => {
			throw new Error("Method not implemented.");
		},
		getByUserId(userId) {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, userLoginRecord: UserLoginRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	board: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, boardRecord: BoardRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (context: ReadonlyDeep<QueryContext>, boardRecord: BoardRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
	},
	boardMember: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		getAdmins: async (context: ReadonlyDeep<QueryContext>, boardId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserIdAndBoardId: async (context: ReadonlyDeep<QueryContext>, userId: number, boardId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserId: async (context: ReadonlyDeep<QueryContext>, userId: number) => {
			throw new Error("Method not implemented.");
		},
		getByBoardId: async (context: ReadonlyDeep<QueryContext>, boardId: number) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, boardId: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, boardMembershipRecord: BoardMembershipRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		getMembersOrderedByJoinedDate: async (context: ReadonlyDeep<QueryContext>, boardId: number) => {
			throw new Error("Method not implemented.");
		}
	},
	event: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, eventRecord: EventRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (context: ReadonlyDeep<QueryContext>, eventRecord: EventRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	eventAttendee: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		getByEventId: async (context: ReadonlyDeep<QueryContext>, eventId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserId: async (context: ReadonlyDeep<QueryContext>, userId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserIdAndEventId: async (context: ReadonlyDeep<QueryContext>, userId: number, eventId: number) => {
			throw new Error("Method not implemented.");
		},
		update: async (context: ReadonlyDeep<QueryContext>, eventAttendeeRecord: EventAttendeeRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, eventAttendeeRecord: EventAttendeeRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		delete: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
	},
	todoItem: {
		getById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		getByUUID: async (context: ReadonlyDeep<QueryContext>, uuid: string) => {
			throw new Error("Method not implemented.");
		},
		insert: async (context: ReadonlyDeep<QueryContext>, todoItemRecord: TodoItemRecordInsertFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (context: ReadonlyDeep<QueryContext>, todoItemRecord: TodoItemRecord) => {
			throw new Error("Method not implemented.");
		},
		deleteById: async (context: ReadonlyDeep<QueryContext>, id: number) => {
			throw new Error("Method not implemented.");
		},
		deleteByUUID: async (context: ReadonlyDeep<QueryContext>, uuid: string) => {
			throw new Error("Method not implemented.");
		},
		getRecentCompleted: async (context: ReadonlyDeep<QueryContext>) => {
			throw new Error("Method not implemented.");
		},
		getRecentCreated: async (context: ReadonlyDeep<QueryContext>) => {
			throw new Error("Method not implemented.");
		},
		getRecentInactive: async (context: ReadonlyDeep<QueryContext>) => {
			throw new Error("Method not implemented.");
		},
		getUpcoming: async (context: ReadonlyDeep<QueryContext>) => {
			throw new Error("Method not implemented.");
		},

	}
}