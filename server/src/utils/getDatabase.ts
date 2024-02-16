import * as schema from "../../drizzle/schema";
import * as schemaRelations from "../../drizzle/schemaRelations";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

type Schema = typeof schema & typeof schemaRelations;

const poolConfig: mysql.PoolOptions = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: Number(process.env.DATABASE_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(poolConfig);
console.info("Database pool created");

export default async function getDatabase(): Promise<MySql2Database<Schema>> {
  try {
    return drizzle<Schema>(pool, {
      mode: "default",
      schema: { ...schema, ...schemaRelations },
    }) as MySql2Database<Schema>;
  } catch (error) {
    console.error("Error in getting database connection from pool:", error);
    throw error;
  }
}

// Optional: Handle clean shutdown
process.on("SIGINT", async () => {
  await pool.end();
  console.info("Database pool closed");
  process.exit(0);
});
