import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";
import getDatabase from "@/app/api/utils/getDatabase";
import { brands } from "../../../../../../drizzle/schema";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function PUT(
  request: Request,
  { params }: { params: { brandId: string } },
) {
  const db = await getDatabase();
  const brandId = +params.brandId;

  try {
    const [brandsSelect] = await db
      .select()
      .from(brands)
      .where(eq(brands.id, brandId));
    return NextResponse.json({ content: brandsSelect }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
