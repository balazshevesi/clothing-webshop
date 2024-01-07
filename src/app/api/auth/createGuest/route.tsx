import { NextResponse } from "next/server";

import { guestUsers, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import jwt from "jsonwebtoken";

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function GET(request: Request) {
  const db = await getDatabase();
  try {
    const [guestUser] = await db.insert(guestUsers).values({
      createdAt: new Date().toISOString(),
      loggedInAt: new Date().toISOString(),
    });
    const guestUserId = guestUser.insertId;
    await db.insert(carts).values({
      guestUserId: guestUserId,
    });

    const userIdJwt = jwt.sign(
      { guestUserId: guestUserId },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "28d",
      },
    );

    return NextResponse.json({ guestUserId: userIdJwt }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
