
import { UserQueryFunctions, UserLoginQueryFunctions, BoardQueryFunctions, BoardMembershipQueryFunctions, EventQueryFunctions, EventAttendeeQueryFunctions, TodoItemQueryFunctions, UserRecordInsertFields, UserRecord, UserLoginRecordInsertFields, BoardRecord, BoardRecordInsertFields, EventRecordInsertFields, EventRecord, BoardMembershipRecordInsertFields, EventAttendeeRecordInsertFields,TodoItemRecord, TodoItemRecordInsertFields  } from "@internal/schema/dist/index";

import { Promisable, ReadonlyDeep } from "type-fest";
import { Database } from "../database";
import { Sequelize, QueryTypes } from "sequelize";

import { userQueryFunctions } from "./user";
import { eventQueryFunctions } from "./event";
import { userApiKeyQueryFunctions } from "./userApikey";


export async function PostgresDatabase(): Promise<Database> {
	if(process.env.PG_HOST === undefined) {
		throw new Error("PG_HOST is not defined");
	}
	if(process.env.PG_USERNAME === undefined) {
		throw new Error("PG_USER is not defined");
	}
	if(process.env.PG_PASSWORD === undefined) {
		throw new Error("PG_PASSWORD is not defined");
	}
	if(process.env.PG_DATABASE === undefined) {
		throw new Error("PG_DATABASE is not defined");
	}
	if(process.env.PG_PORT === undefined) {
		throw new Error("PG_PORT is not defined");
	}
	if(process.env.PG_SCHEMA === undefined) {
		throw new Error("PG_SCHEMA is not defined");
	}

	const connection = new Sequelize({
		dialect: "postgres",
		host: process.env.PG_HOST,
		username: process.env.PG_USERNAME,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		schema: process.env.PG_SCHEMA,
		logging: false,
		pool: {
			max : 10,
			min : 0,
			idle: 2000
		}
	});
	return {
		name: "postgres",
		user: userQueryFunctions(connection),
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
			getByIp: async (ip: string) => {
				throw new Error("Method not implemented.");
			},
			getByUserId(userId) {
				throw new Error("Method not implemented.");
			},
			insert: async (userLoginRecord: UserLoginRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			delete: async (id: number) => {
				throw new Error("Method not implemented.");
			}
		},
		userApiKey: userApiKeyQueryFunctions(connection),
		board: {
			getById: async (id: number) => {
				throw new Error("Method not implemented.");
			},
			insert: async (boardRecord: BoardRecordInsertFields) => {
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
			insert: async (boardMembershipRecord: BoardMembershipRecordInsertFields) => {
				throw new Error("Method not implemented.");
			},
			getMembersOrderedByJoinedDate: async (boardId: number) => {
				throw new Error("Method not implemented.");
			}
		},
		event: eventQueryFunctions(connection),
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
}

