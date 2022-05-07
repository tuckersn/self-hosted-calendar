import { Sequelize } from "sequelize/types";
import { Database as DatabaseInterface } from "./database";
import { PostgresDatabase } from "./postgres/postgres";
import { SqliteDatabase } from "./sqlite/sqlite";


const DATABASE_SETTING: 'sqlite' | 'postgres'  = (process.env.DIALECT as any) || 'sqlite';

export let Database: DatabaseInterface;

let promise: Promise<DatabaseInterface>;
switch(DATABASE_SETTING) {
	case 'sqlite':
		promise = SqliteDatabase();
		break;
	case 'postgres':
		promise = PostgresDatabase();
		break;
	default:
		throw new Error("Invalid env for DATABASE_SETTING");
}

promise.then(database => {
	Database = database;
});
