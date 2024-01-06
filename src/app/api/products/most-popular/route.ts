//! doesn't work
import { NextResponse, NextRequest } from "next/server";

import getDatabase from "../../utils/getDatabase";

export async function GET(request: Request) {
  // const databaseConnection = await getDatabase();
  // if (!databaseConnection) {
  //   console.log("check database connecton");
  //   return NextResponse.json({}, { status: 500 });
  // }

  // const [rows, fields] = await databaseConnection.query(
  //   "SELECT * FROM products LIMIT 5",
  // );

  return NextResponse.json({}, { status: 200 });
}
