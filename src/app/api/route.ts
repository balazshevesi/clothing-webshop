import { NextResponse, NextRequest } from "next/server";

// const mysql = require("mysql2");
import mysql from "mysql2/promise";

export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  });

  connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  );
  return NextResponse.json({ status: 200 });
}
