import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Define the connection configuration using environment variables
const connectionConfig = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
};

// Add disconnect to drizzle
interface DatabaseConnection extends MySql2Database<Record<string, never>> {
  disconnect: Function;
}

async function getDatabaseConnection() {
  try {
    // Create a new connection
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Database connection established");
    return connection;
  } catch (error) {
    console.error("Error establishing database connection:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

// Export a function to get the database connection
export default async function getDatabase() {
  const connection = await getDatabaseConnection();

  const db = drizzle(connection) as DatabaseConnection;
  db.disconnect = () => connection.end();

  return db;
}
