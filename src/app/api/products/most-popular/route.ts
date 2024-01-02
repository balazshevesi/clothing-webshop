import { NextResponse, NextRequest } from "next/server";

import getDatabaseConnection from "../../utils/getDatabaseConnection";

export async function GET(request: Request) {
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) {
    console.log("check database connecton");
    return NextResponse.json({}, { status: 500 });
  }

  const [rows, fields] = await databaseConnection.query(
    "SELECT * FROM products LIMIT 5",
  );

  return NextResponse.json({ content: rows }, { status: 200 });
}
