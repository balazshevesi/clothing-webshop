import { NextResponse } from "next/server";

import { users, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { EmailSchema, PasswordSchema } from "@/inputValidation/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { parse } from "valibot";

interface Body {
  email: string;
  password: string;
}

export interface ResponseAuthLogin {
  userIdJwt: string;
  userInfo: any;
}

export async function POST(request: Request) {
  const { email, password }: Body = await request.json();
  parse(EmailSchema, email);
  parse(PasswordSchema, password);

  const db = await getDatabase();

  const userPassword = (
    await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, email))
  )[0].password;

  const passwordIsCorrect = await bcrypt.compare(password, userPassword);
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
    .where(eq(users.email, email));

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
