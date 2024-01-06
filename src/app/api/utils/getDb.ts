import { drizzle } from "drizzle-orm/mysql2";
import mysql, { Connection } from "mysql2/promise";

let databaseConnection: mysql.Connection | null = null;

const databaseConfig = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
};

async function connectToDb(): Promise<mysql.Connection | null> {
  if (databaseConnection) return databaseConnection;

  //* Check config
  if (
    !databaseConfig.host ||
    !databaseConfig.user ||
    !databaseConfig.password ||
    !databaseConfig.database
  ) {
    console.error("Database configuration is missing");
    return null;
  }

  //* Connect
  try {
    console.log("Connecting to the database...");
    const connection = await mysql.createConnection(databaseConfig);
    databaseConnection = connection;
    console.log("Connection successful");
    return databaseConnection;
  } catch (error) {
    console.error("Database connection error:", error);
    return null;
  }
}

// Export a function to get the database connection
export default async function getDb() {
  if (!databaseConnection) await connectToDb();
  if (!databaseConnection) throw new Error("check database connection");

  const db = drizzle(databaseConnection);
  return db;
}
