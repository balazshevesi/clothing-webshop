import { cookies, headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import getDatabaseConnection from "../../utils/getDatabaseConnection";
import getUserInfoByEmail from "../../utils/getUserInfoByEmail";
import jwt from "jsonwebtoken";

export async function GET(
  request: Request,
  { params }: { params: { ["email"]: string; action: string } },
) {
  console.log("calleddwerwerwerdd");
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const headersList = headers();
  const authorization = headersList.get("Authorization");
  console.log("authorization", authorization);

  //if not logged in
  if (!authorization) return NextResponse.json({}, { status: 401 });

  //verify token
  const verifiedToken = jwt.verify(authorization, process.env.JWT_SECRET_KEY!);
  //if token is invalid
  if (typeof verifiedToken === "string" || verifiedToken instanceof String)
    return NextResponse.json({}, { status: 401 });

  const email = params.email;
  const userInfo = await getUserInfoByEmail(databaseConnection, email);

  return NextResponse.json({ userInfo: userInfo }, { status: 200 });
}
