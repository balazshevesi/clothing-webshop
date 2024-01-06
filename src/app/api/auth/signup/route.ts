import { NextResponse } from "next/server";

import getDb from "../../utils/getDb";
import getEmailIsTaken from "../../utils/getEmailIsTaken";
import getUserInfoByEmail from "../../utils/getUserInfoByEmail";
import createUser from "./createUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const databaseConnection = await getDb();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const body: Body = await request.json();

  const emailIsTaken = await getEmailIsTaken(databaseConnection, body.email);
  if (emailIsTaken)
    return NextResponse.json(
      { errorMessage: "email is taken" },
      { status: 200 },
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);
  await createUser(
    databaseConnection,
    body.firstName,
    body.lastName,
    body.phone,
    body.email,
    hashedPassword,
  );
  const userInfo = await getUserInfoByEmail(databaseConnection, body.email);

  const userIdJwt = jwt.sign(
    { userId: userInfo.id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "28d",
    },
  );

  return NextResponse.json({ userIdJwt: userIdJwt, userInfo }, { status: 200 });
}
