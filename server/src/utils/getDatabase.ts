import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../drizzle/schema";
import * as schemaRelations from "../../drizzle/schemaRelations";

type Schema = typeof schema & typeof schemaRelations;

const connectionConfig: mysql.ConnectionOptions = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: Number(process.env.DATABASE_PORT),
};

let dbConnection: MySql2Database<Schema> | null = null;

export default async function getDatabase(): Promise<MySql2Database<Schema>> {
  if (!dbConnection) {
    try {
      const connection = await mysql.createConnection(connectionConfig);
      console.log("Database connection established");

      dbConnection = drizzle<Schema>(connection, {
        mode: "default",
        schema: { ...schema, ...schemaRelations },
      }) as MySql2Database<Schema>;
    } catch (error) {
      console.error("Error establishing database connection:", error);
      throw error;
    }
  }
  if (!dbConnection) {
    throw new Error("Database connection failed to be established");
  }
  return dbConnection;
}
