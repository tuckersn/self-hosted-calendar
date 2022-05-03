import { Database } from "../database";

export class PostgresDatabase extends Database {
	/**
	 * The name of the database.
	 */
	public readonly name: string = "postgres";
}