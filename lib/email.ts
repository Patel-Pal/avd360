import type { ContactInput } from "@/lib/validation";

/**
 * Email notification for new contact submissions.
 *
 * This is intentionally a clean stub: if RESEND_API_KEY is not configured,
 * it logs and returns without throwing so the contact flow still succeeds
 * (the submission is always saved to MongoDB regardless).
 *
 * To enable real emails: set RESEND_API_KEY, CONTACT_NOTIFY_TO and
 * CONTACT_NOTIFY_FROM in .env.local. Uses Resend's REST API — no extra
 * dependency required.
 */
export async function sendContactNotification(
  data: ContactInput
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_TO;
  const from =
    process.env.CONTACT_NOTIFY_FROM ||
    "AVD 360 Solution <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Not configured — skip cleanly.
    console.info(
      "[email] Notification skipped (RESEND_API_KEY / CONTACT_NOTIFY_TO not set)."
    );
    return { sent: false, reason: "not-configured" };
  }

  const html = `
    <h2>New contact submission — AVD 360 Solution</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company || "-")}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(data.message).replace(
      /\n/g,
      "<br/>"
    )}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New enquiry: ${data.service} — ${data.name}`,
        html,
        reply_to: data.email,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[email] Resend responded with an error:", text);
      return { sent: false, reason: "provider-error" };
    }

    return { sent: true };
  } catch (error) {
    console.error("[email] Failed to send notification:", error);
    return { sent: false, reason: "exception" };
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
