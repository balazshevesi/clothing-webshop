import { NextResponse } from "next/server";

import { users, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

interface Body {
  email: string;
  password: string;
}

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function POST(request: Request) {
  console.log("loginnn calleddd");
  const db = await getDatabase();
  const body: Body = await request.json();

  const userPassword = (
    await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, body.email))
  )[0].password;

  const passwordIsCorrect = await bcrypt.compare(body.password, userPassword);
  if (!passwordIsCorrect)
    return NextResponse.json({ errorMessage: "unauthorized" }, { status: 401 });

  const [userInfo] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
    })
    .from(users)
    .where(eq(users.email, body.email));

  const userIdJwt = jwt.sign(
    { userId: userInfo.id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "28d",
    },
  );

  return NextResponse.json(
    {
      userIdJwt: userIdJwt,
      userInfo,
    },
    { status: 200 },
  );
}
