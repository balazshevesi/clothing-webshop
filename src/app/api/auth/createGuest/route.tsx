import { NextResponse } from "next/server";

import { guestUsers } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function POST(request: Request) {
  const db = await getDatabase();

  const [guestUser] = await db.insert(guestUsers).values({
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });

  return NextResponse.json(
    { guestUserId: guestUser.insertId },
    { status: 200 },
  );
}
