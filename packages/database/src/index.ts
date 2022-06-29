import { Sequelize } from "sequelize/types";
import { Database as DatabaseInterface } from "./database";
import { PostgresDatabase } from "./postgres";
import { SqliteDatabase } from "./sqlite/sqlite";

export * as SequelizeUtils from "./sequelizeUtils";

const DATABASE_SETTING: 'sqlite' | 'postgres' = process.env.DATABASE as any;
if(typeof DATABASE_SETTING !== 'string') {
	throw new Error("DATABASE environment variable is not set");
}

export let Database: DatabaseInterface;

export let databaseInitPromise: Promise<DatabaseInterface>;
switch(DATABASE_SETTING) {
	case 'sqlite':
		databaseInitPromise = SqliteDatabase();
		break;
	case 'postgres':
		databaseInitPromise = PostgresDatabase();
		break;
	default:
		throw new Error("Invalid env for DATABASE_SETTING");
}

databaseInitPromise.then(database => {
	Database = database;
});
