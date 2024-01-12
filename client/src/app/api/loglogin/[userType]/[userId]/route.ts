import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { guestUsers, users } from "../../../../../../drizzle/schema";
import getDatabase from "@/app/api/utils/getDatabase";
import getIsAdmin from "@/app/api/utils/getIsAdmin";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function GET(
  request: Request,
  { params }: { params: { userType: "guest" | "user"; userId: string } },
) {
  const db = await getDatabase();
  const userType = params.userType;
  const userId = +params.userId;

  const headersList = headers();

  try {
    if (userType === "guest") {
      const guestUserAuth = headersList.get("guestUserAuth");
      if (!guestUserAuth) return false;
      const guestUserId = jwt.verify(
        guestUserAuth,
        process.env.JWT_SECRET_KEY!,
      );
      if (typeof guestUserId === "string" || guestUserId instanceof String)
        return;
      await db
        .update(guestUsers)
        .set({ loggedInAt: new Date().toISOString() })
        .where(eq(guestUsers.id, guestUserId.guestUserId));
    } else if (userType === "user") {
      const authorization = headersList.get("authorization");
      if (!authorization) return false;
      const verifiedTokenUser = jwt.verify(
        authorization,
        process.env.JWT_SECRET_KEY!,
      );
      if (
        typeof verifiedTokenUser === "string" ||
        verifiedTokenUser instanceof String
      )
        return;

      console.log("verifiedTokenUseverifiedTokenUserr", verifiedTokenUser);

      await db
        .update(users)
        .set({ loggedInAt: new Date().toISOString() })
        .where(eq(users.id, verifiedTokenUser.userId));
    }
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
    return NextResponse.json({}, { status: 200 });
  }
}
