import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import getDatabase from "../../utils/getDatabase";
import { brands, users } from "./../../../../../drizzle/schema";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function POST(request: Request) {
  const { name, image, description }: Body = await request.json();

  parse(GenericInputSchema, name);
  parse(GenericInputSchema, image);
  parse(GenericInputSchema, description);

  const db = await getDatabase();

  //* check if admin
  const headersList = headers();
  const authorization = headersList.get("authorization");
  if (!authorization) return NextResponse.json({}, { status: 401 });

  const verifiedToken = jwt.verify(authorization, process.env.JWT_SECRET_KEY!);
  if (typeof verifiedToken === "string" || verifiedToken instanceof String)
    return NextResponse.json({}, { status: 401 });

  const [userInfo] = await db
    .select({
      isAdmin: users.isAdmin,
    })
    .from(users)
    .where(eq(users.id, verifiedToken.userId));
  if (!userInfo.isAdmin) return NextResponse.json({}, { status: 401 });

  try {
    const [insertBrand] = await db.insert(brands).values({
      name,
      image,
      description,
    });
    const insertBrandId = insertBrand.insertId;
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }

  console.log("niceeee");

  return NextResponse.json({ status: 200 });
}
