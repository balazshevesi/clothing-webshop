import { NextResponse, NextRequest } from "next/server";

import getDatabaseConnection from "../utils/getDatabaseConnection";

export interface body {
  page: number;
  sort: "price descending" | "price ascending" | "alphabetical";
  priceRange: number[];
  category: string;
}

function inputSortToSql(body: body) {
  let orderBy;
  if (body.sort === "price descending") orderBy = "price DESC";
  if (body.sort === "price ascending") orderBy = "price ASC";
  if (body.sort === "alphabetical") orderBy = "title ASC";
  return orderBy;
}

export async function POST(request: Request) {
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) {
    console.log("check database connecton");
    return NextResponse.json({}, { status: 500 });
  }

  const body = await request.json();

  //* content
  let baseQuery = "FROM products WHERE price > ? AND price < ?";
  const orderBy = inputSortToSql(body);
  const queryParams = [body.priceRange[0], body.priceRange[1]];

  // filter by category
  if (body.category) {
    baseQuery += " AND category = ?";
    queryParams.push(body.category);
  }

  //query for content
  let contentQuery = `SELECT * ${baseQuery} ORDER BY ${orderBy} LIMIT ? OFFSET ?`;
  const contentParams = [...queryParams, "4", String(+body.page - 1)];

  const [content] = await databaseConnection.execute(
    contentQuery,
    contentParams,
  );

  //query for the count
  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;
  const [total] = await databaseConnection.execute(countQuery, queryParams);

  return NextResponse.json({ total, content }, { status: 200 });
}
