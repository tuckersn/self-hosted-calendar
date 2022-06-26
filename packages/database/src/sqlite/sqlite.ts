import {
	UserQueryFunctions,
	UserLoginQueryFunctions, EventQueryFunctions, EventAttendeeQueryFunctions,
	UserRecordInsertFields, UserRecord, UserLoginRecordInsertFields,
	EventRecordInsertFields, EventRecord, EventAttendeeRecordInsertFields,
	UserApiKeyRecordInsertFields, UserApiKeyRecord, TaskBoardRecordInsertFields, TaskBoardRecord, TaskBoardMembershipRecordInsertFields, TaskRecord, TaskRecordInsertFields, CalendarRecordInsertFields, CalendarRecord } from "@internal/schema/dist/index";
import { Promisable, ReadonlyDeep } from "type-fest";
import { Database } from "../database";

//--------------------------------------------------------//
//
// It's a lot of overheard to support multiple databases,
// but I would like to keep the door open to it. This is
// a placeholder for the actual database implementation.
//
//--------------------------------------------------------//
export async function SqliteDatabase(): Promise<Database> {
	return {
		name: "sqlite",
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
			getByUUID: async (uuid: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (userRecord: UserRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			updateById: async (id: number, userRecord: Partial<UserRecord>) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getOverview: async () => {
				throw new Error("Method not implemented.");
			}
		},
		userLogin: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getByUsername: async (username: string) => {
				throw new Error("Method not implemented.");
			},
			getByEmail: async (email: string) => {
				throw new Error("Method not implemented.");
			},
			getByUserId: async (userId: number) => {
				throw new Error("Method not implemented.");
			},
			getByIp: async (ip: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (userLoginRecord: UserLoginRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			}
		},
		userApiKey: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getByUserId: async (userId: number) => {
				throw new Error("Method not implemented.");
			},
			getByKeyName: async (keyName: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (userApiKeyRecord: UserApiKeyRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			updateById: async (id: number, userApiKeyRecord: Partial<UserApiKeyRecord>) => {
				throw new Error("Method not implemented.");
			}
		},
		board: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			insert: async (boardRecord: TaskBoardRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			update: async (boardRecord: TaskBoardRecord) => {
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
			insert: async (boardMembershipRecord: TaskBoardMembershipRecordInsertFields) => {
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
			getByUUID: async (uuid: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (eventRecord: EventRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			updateById: async (eventRecord: EventRecord) => {
				throw new Error("Method not implemented.");
			},
			updateByUUID: async (eventRecord: EventRecord) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getTimeRange: async (start: Date, end: Date) => {
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
			update: async (eventAttendeeRecord: EventAttendeeRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			insert: async (eventAttendeeRecord: EventAttendeeRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			},
		},
		task: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getByUUID: async (uuid: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (todoItemRecord: TaskRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			update: async (todoItemRecord: TaskRecord) => {
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
			getRecentUpdated: async () => {
				throw new Error("Method not implemented.");
			}
		},
		calendar: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			getByUUID: async (uuid: string) => {
				throw new Error("Method not implemented.");
			},
			insert: async (calendarRecord: CalendarRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			update: async (calendarRecord: CalendarRecord) => {
				throw new Error("Method not implemented.");
			},
			deleteByUUID: async (uuid: string) => {
				throw new Error("Method not implemented.");
			},
			getListByUserUUID: (uuid, context) => {
				throw new Error("Method not implemented.");
			}
		},
		calendarMember: {
			delete: async () => {
				throw new Error("Method not implemented.");
			},
			getById: async () => {
				throw new Error("Method not implemented.");
			},
			getByUserId: async () => {
				throw new Error("Method not implemented.");
			},
			insert: async () => {
				throw new Error("Method not implemented.");
			},
		}
	}
}