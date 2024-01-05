import { NextResponse } from "next/server";

import getDatabaseConnection from "../../utils/getDatabaseConnection";
import getEmailIsTaken from "../../utils/getEmailIsTaken";
import getPasswordByEmail from "../../utils/getPasswordByEmail";
import getUserInfoByEmail from "../../utils/getUserInfoByEmail";
import bcrypt from "bcrypt";
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
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const body: Body = await request.json();

  const userPassword = await getPasswordByEmail(databaseConnection, body.email);
  const passwordIsCorrect = await bcrypt.compare(body.password, userPassword);
  if (!passwordIsCorrect)
    return NextResponse.json({ errorMessage: "unauthorized" }, { status: 401 });

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
