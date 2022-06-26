
import {
	UserQueryFunctions,
	UserLoginQueryFunctions,
	TaskBoardQueryFunctions,
	TaskBoardMembershipQueryFunctions,
	EventQueryFunctions,
	EventAttendeeQueryFunctions,
	TaskQueryFunctions,
	UserRecordInsertFields,
	UserRecord,
	UserLoginRecordInsertFields,
	TaskBoardRecord,
	TaskBoardRecordInsertFields,
	EventRecordInsertFields,
	EventRecord,
	TaskBoardMembershipRecordInsertFields,
	EventAttendeeRecordInsertFields,
	TaskRecord,
	TaskRecordInsertFields,
	CalendarRecordInsertFields,
	CalendarRecord,
	CalendarMembershipQueryFunctions
} from "@internal/schema/dist/index";

import { Promisable, ReadonlyDeep } from "type-fest";
import { Database } from "../database";
import { Sequelize, QueryTypes } from "sequelize";

import { userQueryFunctions } from "./user";
import { eventQueryFunctions } from "./event";
import { userApiKeyQueryFunctions } from "./userApikey";
import { taskQueryFunctions } from "./task";
import { calendarQueryFunctions } from "./calendar";
import { calendarMemberQueryFunctions } from "./calendarMember";

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
		task: taskQueryFunctions(connection),
		calendar: calendarQueryFunctions(connection),
		calendarMember: calendarMemberQueryFunctions(connection)
	}
}

