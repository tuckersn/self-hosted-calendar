import { Database as DatabaseInterface } from "./database";
import { PostgresDatabase } from "./postgres/postgres";
import { SqliteDatabase } from "./sqlite/sqlite";


const DATABASE_SETTING: 'sqlite' | 'postgres'  = (process.env.DIALECT as any) || 'sqlite';

let _Database: DatabaseInterface;
switch(DATABASE_SETTING) {
	case 'sqlite':
		_Database = SqliteDatabase;
	case 'postgres':
		_Database =  PostgresDatabase;
	default:
		throw new Error("Invalid env for DATABASE_SETTING");
}

export const Database = _Database;