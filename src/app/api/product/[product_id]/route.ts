import { NextResponse, NextRequest } from "next/server";

import getDb from "../../utils/getDb";

export async function GET(
  request: Request,
  { params }: { params: { product_id: string; action: string } },
) {
  const databaseConnection = await getDb();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const product_id = params.product_id;
  // const [rows, fields] = await databaseConnection.query(
  //   "SELECT * FROM products WHERE ",
  // );

  const query = "SELECT * FROM products WHERE id = ?";
  const [rows] = await databaseConnection.execute(query, [product_id]);

  return NextResponse.json({ content: rows }, { status: 200 });
}
