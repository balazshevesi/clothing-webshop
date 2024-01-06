import { NextResponse } from "next/server";

import { guestUsers } from "../../../../../drizzle/schema";
import getDb from "../../utils/getDb";

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function POST(request: Request) {
  const db = await getDb();

  const guestUser = await db.insert(guestUsers).values({
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });
  console.log("guestUseweruwherhuwehriur", guestUser);

  // if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  // const guestUserId = await createGuest(databaseConnection);
  // console.log("guestUserId", guestUserId);

  return NextResponse.json({}, { status: 200 });
}
