import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { brands, users } from "../../../../../../drizzle/schema";
import getDatabase from "@/app/api/utils/getDatabase";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { brandId: string } },
) {
  const brandId = +params.brandId;

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
    const [brandsUpdate] = await db
      .update(brands)
      .set({ name, description, image })
      .where(eq(brands.id, brandId));
    return NextResponse.json({ content: brandsUpdate }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { brandId: string } },
) {
  const brandId = +params.brandId;

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
    const [brandsUpdate] = await db
      .delete(brands)
      .where(eq(brands.id, brandId));
    return NextResponse.json({ content: brandsUpdate }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
