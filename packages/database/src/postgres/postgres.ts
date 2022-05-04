import { UserQueryFunctions, UserLoginQueryFunctions, BoardQueryFunctions, BoardMembershipQueryFunctions, EventQueryFunctions, EventAttendeeQueryFunctions, TodoItemQueryFunctions, UserRecordInsertRequiredFields, UserRecord, UserLoginRecordInsertRequiredFields, BoardRecord, BoardRecordInsertRequiredFields, EventRecordInsertRequiredFields, EventRecord, BoardMembershipRecordInsertRequiredFields, EventAttendeeRecordInsertRequiredFields, TodoItemRecordInsertRequiredFields, TodoItemRecord, TodoItemRecordInsertFields } from "@internal/schema/dist";
import { Promisable } from "type-fest";
import { Database } from "../database";

export const PostgresDatabase: Database = {
	name: "postgres",
	start: async () => {
		return;
	},
	user: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		getByEmail: async (email: string) => {
			throw new Error("Method not implemented.");
		},
		getByUsername: async (username: string) => {
			throw new Error("Method not implemented.");
		},
		insert: async (userRecord: UserRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (userRecord: UserRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	userLogins: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		getByUsername: async (username: string) => {
			throw new Error("Method not implemented.");
		},
		getByEmail: async (email: string) => {
			throw new Error("Method not implemented.");
		},
		getByIp: async (ip: string) => {
			throw new Error("Method not implemented.");
		},
		getByUserId(userId) {
			throw new Error("Method not implemented.");
		},
		insert: async (userLoginRecord: UserLoginRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	board: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (boardRecord: BoardRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (boardRecord: BoardRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		},
	},
	boardMember: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		getAdmins: async (boardId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserIdAndBoardId: async (userId: number, boardId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserId: async (userId: number) => {
			throw new Error("Method not implemented.");
		},
		getByBoardId: async (boardId: number) => {
			throw new Error("Method not implemented.");
		},
		delete: async (boardId: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (boardMembershipRecord: BoardMembershipRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		getMembersOrderedByJoinedDate: async (boardId: number) => {
			throw new Error("Method not implemented.");
		}
	},
	event: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		insert: async (eventRecord: EventRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (eventRecord: EventRecord) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		}
	},
	eventAttendee: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		getByEventId: async (eventId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserId: async (userId: number) => {
			throw new Error("Method not implemented.");
		},
		getByUserIdAndEventId: async (userId: number, eventId: number) => {
			throw new Error("Method not implemented.");
		},
		update: async (eventAttendeeRecord: EventAttendeeRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		insert: async (eventAttendeeRecord: EventAttendeeRecordInsertRequiredFields) => {
			throw new Error("Method not implemented.");
		},
		delete: async (id: number) => {
			throw new Error("Method not implemented.");
		},
	},
	todoItem: {
		getById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		getByUUID: async (uuid: string) => {
			throw new Error("Method not implemented.");
		},
		insert: async (todoItemRecord: TodoItemRecordInsertFields) => {
			throw new Error("Method not implemented.");
		},
		update: async (todoItemRecord: TodoItemRecord) => {
			throw new Error("Method not implemented.");
		},
		deleteById: async (id: number) => {
			throw new Error("Method not implemented.");
		},
		deleteByUUID: async (uuid: string) => {
			throw new Error("Method not implemented.");
		},
		getRecentCompleted: async () => {
			throw new Error("Method not implemented.");
		},
		getRecentCreated: async () => {
			throw new Error("Method not implemented.");
		},
		getRecentInactive: async () => {
			throw new Error("Method not implemented.");
		},
		getUpcoming: async () => {
			throw new Error("Method not implemented.");
		},

	}
}

