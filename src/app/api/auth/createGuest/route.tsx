import { NextResponse } from "next/server";

import { guestUsers, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function GET(request: Request) {
  console.log("calledddsdfsdfsf")
  const db = await getDatabase();

  const [guestUser] = await db.insert(guestUsers).values({
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });
  const userId = guestUser.insertId;
  console.log("userId", userId);
  await db.insert(carts).values({
    guestUserId: userId,
  });

  return NextResponse.json(
    { guestUserId: guestUser.insertId },
    { status: 200 },
  );
}
