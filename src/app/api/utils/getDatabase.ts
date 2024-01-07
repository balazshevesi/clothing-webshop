import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

// Define the pool configuration using environment variables
const poolConfig = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // You can adjust this value based on your needs and database server capacity
  queueLimit: 0,
};

// Create a pool using the configuration
const pool = mysql.createPool(poolConfig);

async function getDatabaseConnection(): Promise<mysql.PoolConnection> {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log("Database connection acquired from pool");
    return connection;
  } catch (error) {
    console.error("Error acquiring database connection from pool:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

// Export a function to get the database connection
export default async function getDatabase() {
  const connection = await getDatabaseConnection();

  // Make sure to release the connection back to the pool when done
  // You can use connection.release() after your database operations are complete

  const db = drizzle(connection);
  return db;
}
