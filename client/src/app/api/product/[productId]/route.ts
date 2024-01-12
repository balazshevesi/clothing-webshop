//! doesn't work
import { NextResponse, NextRequest } from "next/server";

import getDatabase from "../../utils/getDatabase";

export async function GET(
  request: Request,
  { params }: { params: { productId: string; action: string } },
) {
  // const databaseConnection = await getDatabase();
  // if (!databaseConnection) return NextResponse.json({}, { status: 500 });
  // const productId = params.productId;
  // // const [rows, fields] = await databaseConnection.query(
  // //   "SELECT * FROM products WHERE ",
  // // );
  // const query = "SELECT * FROM products WHERE id = ?";
  // const [rows] = await databaseConnection.execute(query, [productId]);
  // return NextResponse.json({ content: rows }, { status: 200 });
}
