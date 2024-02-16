import {
  guestUsers as guestUsersTbl,
  users as usersTbl,
} from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import * as jose from "jose";

export default async function getAndValidateGuestUser(
  guestUserId: string,
  guestUserAuth: string,
  db: MySql2Database<any>,
) {
  const { payload } = await jose.jwtVerify(
    guestUserAuth,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY!),
  );
  if (+guestUserId !== payload.guestUserId)
    return new Error("user trying to access a different users info");

  const [guestUser] = await db
    .select()
    .from(guestUsersTbl)
    .where(eq(guestUsersTbl.id, +guestUserId));

  return guestUser;
}
