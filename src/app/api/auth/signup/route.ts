import { NextResponse, NextRequest } from "next/server";

import getDatabaseConnection from "../../utils/getDatabaseConnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface body {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export async function POST(request: Request) {
  const databaseConnection = await getDatabaseConnection();
  if (!databaseConnection) return NextResponse.json({}, { status: 500 });

  const body = await request.json();

  const hashedPassword = await bcrypt.hash(requestBody.password, 10);

  return NextResponse.json({ status: 200 });
}
