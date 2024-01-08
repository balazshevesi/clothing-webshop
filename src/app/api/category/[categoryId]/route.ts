import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";


import getDatabase from "../../utils/getDatabase";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";
import { categories } from "../../../../../drizzle/schema";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } },
) {
  const db = await getDatabase();
  const categoryId = +params.categoryId;

  try {
    const [categorySelect] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));
    return NextResponse.json({ content: categorySelect }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
