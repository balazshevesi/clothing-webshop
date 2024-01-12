import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

import getDatabase from "../../utils/getDatabase";
import getIsAdmin from "../../utils/getIsAdmin";
import { brands, categories, users } from "../../../../../drizzle/schema";
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
  const headersList = headers();
  const isAdmin = getIsAdmin(db, headersList);
  if (!isAdmin) {
    db.disconnect();
    return NextResponse.json({}, { status: 401 });
  }

  try {
    await db.insert(categories).values({
      name,
      image,
      description,
    });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }

  return NextResponse.json({ status: 200 });
}
