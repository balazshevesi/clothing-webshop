import { NextResponse, NextRequest } from "next/server";

import { categories } from "../../../../../drizzle/schema";
import getDatabase from "../../utils/getDatabase";
import { eq } from "drizzle-orm";

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
