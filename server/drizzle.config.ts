import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_URL!,
    port: +process.env.DATABASE_PORT!,
    database: process.env.DATABASE_DATABASE!,
  },
} satisfies Config;
