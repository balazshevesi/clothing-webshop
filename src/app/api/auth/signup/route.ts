import { NextResponse } from "next/server";

import { users, carts } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import {
  EmailSchema,
  FirstNameSchema,
  LastNameSchema,
  PasswordSchema,
  PhoneSchema,
} from "@/inputValidation/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { parse } from "valibot";

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ResponseAuthSignup {
  userIdJwt: string;
  userInfo: UserInfo;
}

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, password }: Body =
    await request.json();
  parse(FirstNameSchema, firstName);
  parse(LastNameSchema, lastName);
  parse(EmailSchema, email);
  parse(PhoneSchema, phone);
  parse(PasswordSchema, password);

  const db = await getDatabase();

  const emailIsTaken =
    (await db.select().from(users).where(eq(users.email, email))).length > 0;

  if (emailIsTaken)
    return NextResponse.json(
      { errorMessage: "email is taken" },
      { status: 200 },
    );

  console.log("body.passworwerwer", password);
  const hashedPassword = await bcrypt.hash(password, 10);

  const [insertUser] = await db.insert(users).values({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
    email: email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    loggedInAt: new Date().toISOString(),
  });
  const userId = insertUser.insertId;

  const [userInfo] = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
    })
    .from(users)
    .where(eq(users.id, userId));

  await db.insert(carts).values({
    userId: userId,
  });

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
