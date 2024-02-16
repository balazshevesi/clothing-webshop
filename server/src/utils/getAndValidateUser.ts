import { users as usersTbl } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import * as jose from "jose";

export default async function getAndValidateUser(
  userId: string,
  userAuth: string,
  db: MySql2Database<any>,
) {
  const { payload } = await jose.jwtVerify(
    userAuth,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY!),
  );
  if (+userId !== payload.userId)
    return new Error("user trying to access a different users info");

  const [user] = await db
    .select()
    .from(usersTbl)
    .where(eq(usersTbl.id, +userId));

  return user;
}
