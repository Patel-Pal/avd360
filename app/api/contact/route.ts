import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { contactSchema } from "@/lib/validation";
import { sendContactNotification } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/contact — save a contact submission to MongoDB. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  try {
    await connectToDatabase();
    const doc = await Contact.create(parsed.data);

    // Fire the notification but never let it fail the request.
    const notify = await sendContactNotification(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received.",
        id: doc._id,
        notified: notify.sent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[api/contact] Failed to save submission:", error);
    return NextResponse.json(
      { error: "We couldn't save your enquiry. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact — list submissions (protected, for future admin use).
 * Requires header `Authorization: Bearer <ADMIN_API_TOKEN>`.
 */
export async function GET(request: Request) {
  const token = process.env.ADMIN_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization") || "";
  const provided = auth.replace(/^Bearer\s+/i, "");
  if (provided !== token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const submissions = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return NextResponse.json({ count: submissions.length, submissions });
  } catch (error) {
    console.error("[api/contact] Failed to list submissions:", error);
    return NextResponse.json(
      { error: "Failed to load submissions." },
      { status: 500 }
    );
  }
}
