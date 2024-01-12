import { NextResponse, NextRequest } from "next/server";

import {
  brands,
  categories,
  listings,
  users,
} from "../../../../drizzle/schema";
import getDatabase from "../utils/getDatabase";

export async function GET(request: Request) {
  const db = await getDatabase();
  try {
    const caregoriesSelect = await db.select().from(listings);
    return NextResponse.json({ content: caregoriesSelect }, { status: 200 });
  } catch (error) {
    console.error(error);
  } finally {
    db.disconnect();
  }
}
