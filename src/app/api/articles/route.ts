import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import { articles, brands, categories, users } from "../../../../drizzle/schema";
import getDatabase from "../utils/getDatabase";
import { GenericInputSchema } from "@/inputValidation/schema";
import { eq } from "drizzle-orm";
import { parse, string } from "valibot";

export interface Body {
  name: string;
  image: string;
  description: string;
}

export async function GET(request: Request) {
  const db = await getDatabase();

  try {
    const caregoriesSelect = await db.select().from(articles);
    return NextResponse.json({ content: caregoriesSelect }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
