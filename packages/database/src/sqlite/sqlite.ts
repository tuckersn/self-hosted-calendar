import { Database } from "../database";

export class SqliteDatabase extends Database {
	/**
	 * The name of the database.
	 */
	public readonly name: string = "sqlite";
}