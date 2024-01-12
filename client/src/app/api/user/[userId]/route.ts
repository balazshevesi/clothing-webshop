import { cookies, headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { users, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function GET(
  request: Request,
  { params }: { params: { ["userId"]: string; action: string } },
) {
  const db = await getDatabase();

  try {
    const headersList = headers();
    const authorization = headersList.get("authorization");

    //if not logged in
    if (!authorization) return NextResponse.json({}, { status: 401 });

    //verify token
    const verifiedToken = jwt.verify(
      authorization,
      process.env.JWT_SECRET_KEY!,
    );
    //if token is invalid
    if (typeof verifiedToken === "string" || verifiedToken instanceof String)
      return NextResponse.json({}, { status: 401 });

    const userId = +params.userId;
    // const userInfo = await getUserInfoByEmail(databaseConnection, email);
    const [userInfo] = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        phoneNumber: users.phoneNumber,
        isAdmin: users.isAdmin,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (verifiedToken.userId !== userInfo.id)
      return NextResponse.json({}, { status: 401 });

    return NextResponse.json({ userInfo: userInfo }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
