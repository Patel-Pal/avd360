import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/models/Subscriber";
import { newsletterSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/newsletter — capture an email subscriber. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  try {
    await connectToDatabase();
    await Subscriber.updateOne(
      { email: parsed.data.email.toLowerCase() },
      { $setOnInsert: { email: parsed.data.email.toLowerCase() } },
      { upsert: true }
    );
    return NextResponse.json(
      { success: true, message: "You're subscribed." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/newsletter] Failed to subscribe:", error);
    return NextResponse.json(
      { error: "We couldn't subscribe you right now. Please try again later." },
      { status: 500 }
    );
  }
}
