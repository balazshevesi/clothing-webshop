import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { users } from "../../../../drizzle/schema";
import { DatabaseConnection } from "./getDatabase";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export default async function getIsAdmin(
  db: DatabaseConnection,
  headersList: ReadonlyHeaders
) {
  const authorization = headersList.get("authorization");
  if (!authorization) return false;

  const verifiedToken = jwt.verify(authorization, process.env.JWT_SECRET_KEY!);
  if (typeof verifiedToken === "string" || verifiedToken instanceof String)
    return false;

  const [userInfo] = await db
    .select({
      isAdmin: users.isAdmin,
    })
    .from(users)
    .where(eq(users.id, verifiedToken.userId));
  if (!userInfo.isAdmin) return false;

  return true;
}
