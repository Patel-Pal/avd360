import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/models/Subscriber";
import { newsletterSchema } from "@/lib/validation";
import { sendNewsletterWelcome } from "@/lib/email";

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
    const email = parsed.data.email.toLowerCase();
    const result = await Subscriber.updateOne(
      { email },
      { $setOnInsert: { email } },
      { upsert: true }
    );

    // Only welcome genuinely new subscribers; never let email failure break the flow.
    let welcomed = false;
    if (result.upsertedCount > 0) {
      const sent = await sendNewsletterWelcome(email);
      welcomed = sent.sent;
    }

    return NextResponse.json(
      { success: true, message: "You're subscribed.", welcomed },
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
