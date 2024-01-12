import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { brands, categories, users } from "../../../../../../drizzle/schema";
import getDatabase from "@/app/api/utils/getDatabase";
import getIsAdmin from "@/app/api/utils/getIsAdmin";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  const categoryId = +params.categoryId;

  const { name, image, description }: Body = await request.json();

  parse(GenericInputSchema, name);
  parse(GenericInputSchema, image);
  parse(GenericInputSchema, description);

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await db
      .update(categories)
      .set({ name, description, image })
      .where(eq(categories.id, categoryId));
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
  return NextResponse.json({}, { status: 500 });
}
export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  const categoryId = +params.categoryId;

  const db = await getDatabase();
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await db.delete(categories).where(eq(categories.id, categoryId));
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }

  return NextResponse.json({}, { status: 200 });
}
