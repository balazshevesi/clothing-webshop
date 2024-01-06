import { NextResponse } from "next/server";

import getDatabaseConnection from "../../utils/getDatabaseConnection";
import createGuest from "./createGuest";

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function POST(request: Request) {
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const guestUserId = await createGuest(databaseConnection);
  console.log("guestUserId", guestUserId);

  return NextResponse.json({ guestUserId }, { status: 200 });
}
