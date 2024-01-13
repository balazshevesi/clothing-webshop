import { Hono } from "hono";
import * as jose from "jose";

import * as schema from "../drizzle/schema";
import * as schemaRelations from "../drizzle/schemaRelations";
import { users } from "../drizzle/schema";

import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";

//~ init database
const connectionConfig = {
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: Number(process.env.DATABASE_PORT),
};
let dbConnection: any;
export async function getDatabase() {
  if (!dbConnection) {
    try {
      const connection = await mysql.createConnection(connectionConfig);
      console.log("Database connection established");

      dbConnection = drizzle(connection, {
        mode: "default",
        schema: { ...schema, ...schemaRelations },
      });
      dbConnection.disconnect = () => connection.end();
    } catch (error) {
      console.error("Error establishing database connection:", error);
      throw error;
    }
  }
  return dbConnection;
}

//~ define routes
const adminRoutes = new Hono();
adminRoutes.use(async (c, next) => {
  const authHeader = JSON.parse(
    JSON.stringify(c.req.raw.headers)
  ).authorization;

  !authHeader && c.status(401);
  if (!authHeader) return c.json({});

  const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
  const { payload } = JSON.parse(
    JSON.stringify(await jose.jwtVerify(authHeader, encodedKey))
  );
  const db = await getDatabase();
  const [userInfo] = await db
    .select({
      isAdmin: users.isAdmin,
    })
    .from(users)
    .where(eq(users.id, payload.userId));

  if (!userInfo || !userInfo.isAdmin) {
    console.log("not admin");
  }
  console.log("middleware done");

  await next();
});

adminRoutes.get("/", (c) => c.text("List Books"));

const app = new Hono();
app.route("/admin", adminRoutes);
app.get("/article", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/articles", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/auth", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/brand", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/brands", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/category", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/categories", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/listing", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/listings", (c) => {
  c.status(200);
  return c.json({});
});
app.get("/user", (c) => {
  c.status(200);
  return c.json({});
});

//~ shutdown
function handleExit(signal: string) {
  console.log(`Received ${signal}. Close my server properly.`);
  getDatabase()
    .then((db) => {
      db.disconnect().then(() => {
        console.log("Database connection closed.");
        process.exit(0);
      });
    })
    .catch((error) => {
      console.error(
        "Error occurred while closing the database connection:",
        error
      );
      process.exit(1);
    });
}
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

//~ export
export default {
  port: 3002,
  fetch: app.fetch,
};
